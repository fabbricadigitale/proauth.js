import OAuth2Client from "../common/OAuth2Client"

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
  }

  /**
   * @param {FetchEvent} event The intercepted event
   * @returns {void}
   */
  handle(event) {
    console.log(`proauth.js Oauth2Handler::handle for ${event.request.url}`)

    const {oauthUrl} = this.settings
    const request = event.request
    const url = request.url
    const isAuthRequest = url === oauthUrl || `${url}/` === oauthUrl
    const oauth = this.oauth2Client
    const unauthorizedHttpCode = 401
    let tokens = this.session.content || {}

    const updateSession = (grantPromise) => {
      return grantPromise.then((oA2Response) => {
        console.log("proauth.js: authentication successful, updating session", oA2Response)
        tokens = this.session.content = oA2Response.toObject()
        return true
      }, (oA2Error) => {
        console.log("proauth.js: cannot authenticate, clearing session", oA2Error)
        this.session.clear()
        return false
      })
    }

    // If it is not trying to authenticate then attach the access token
    if (!isAuthRequest && tokens.accessToken) {
      request.headers.set("Authorization", `${tokens.tokenType} ${tokens.accessToken}`)
    }

    const requestCopy = request.clone()
    // Fetch and handle the response
    const fetch = this.fetch
    event.respondWith(fetch(request).then((response) => {

      if (response.ok) {
        // Is it an authentication response?
        if (isAuthRequest) {
          return updateSession(
            oauth.handleAuthenticationResponse(response.clone())
          ).then(() => response)
        }
      } else if (response.status === unauthorizedHttpCode && tokens.refreshToken) {
        // Got 401, but we have a refresh token, so try to get a new access token
        return oauth.refreshToken(tokens.refreshToken).then((authResponse) => {
          return updateSession(
            oauth.handleAuthenticationResponse(authResponse)
          ).then((newSession) => {
            // We got a new token?
            // Then try to re-fetch the original request...
            if (newSession) {
              requestCopy.headers.set("Authorization", `${tokens.tokenType} ${tokens.accessToken}`)
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
