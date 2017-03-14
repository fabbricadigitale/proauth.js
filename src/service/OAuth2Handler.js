import OAuth2Client from "../common/OAuth2Client"

const attachAuthorization = (session, request) => {
  const tokens = session.content || {}
  if (tokens.accessToken) {
    request.headers.set("Authorization", `${tokens.tokenType} ${tokens.accessToken}`)
  }
}

const updateSession = (session, grantPromise) => {
  return grantPromise.then((oA2Response) => {
    console.log("proauth.js: authentication successful, updating session", oA2Response)
    session.content = oA2Response.toObject()
    return true
  }, (oA2Error) => {
    console.log("proauth.js: cannot authenticate, clearing session", oA2Error)
    session.clear()
    return false
  })
}

export default class Oauth2Handler {

  /**
   * Create an OAuth2.0 handler.
   *
   * @param {Object} settings The settings
   * @param {SessionHandler} session The session
   * @param {Function} fetch The fetch function
   */
  constructor(settings, session, fetch) {
    this.settings = settings
    this.session = session
    this.fetch = fetch
    this.oauth2Client = new OAuth2Client(settings.oauthUrl, settings.oauthClientId, fetch)
    this.invalidGrantHttpCode = 401
  }

  /**
   * Update the session on response
   *
   * @param {FetchEvent} event The intercepted event
   * @returns {void}
   */
  handleAuthentication(event) {
    const fetch = this.fetch
    event.respondWith(fetch(event.request).then((response) => {
      // Just update the session on response
      return updateSession(
        this.session,
        this.oauth2Client.handleAuthenticationResponse(response.clone())
      ).then(() => response)
    }))
  }

  /**
   * Set the current token and handle 401s
   *
   * @param {FetchEvent} event The intercepted event
   * @returns {void}
   */
  handle(event) {
    console.log(`proauth.js Oauth2Handler::handle for ${event.request.url}`)

    const { oauthUrl } = this.settings
    const request = event.request
    const url = request.url
    const isAuthRequest = url === oauthUrl || `${url}/` === oauthUrl

    if (isAuthRequest) {
      this.handleAuthentication(event)
      return
    }

    // Attach the current token
    attachAuthorization(this.session, request)

    const oauth = this.oauth2Client
    const requestCopy = request.clone()
    const fetch = this.fetch

    // Finally, fetch and handle the response
    event.respondWith(fetch(request).then((response) => {
      const tokens = this.session.content || {}
      if (response.status === this.invalidGrantHttpCode && tokens.refreshToken) {
        // Got 401, but we have a refresh token, so try to get a new access token
        return oauth.refreshToken(tokens.refreshToken).then((authResponse) => {
          return updateSession(
            this.session,
            oauth.handleAuthenticationResponse(authResponse)
          ).then((newSession) => {
            // We got a new token?
            // Then try to re-fetch the original request...
            if (newSession) {
              attachAuthorization(this.session, requestCopy)
              return fetch(requestCopy)
            } //...else passthrough the 401 response
            return response
          })
        })
      }
      return response // Passthrough any others
    }))
  }

}
