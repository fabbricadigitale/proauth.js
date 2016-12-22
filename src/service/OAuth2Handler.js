import OAuth2Client from '../common/OAuth2Client'
export default class Oauth2Handler {

  /**
   * @param {Object} settings
   * @param {SessionHandler} session
   * @param {Function} fetch
   */
  constructor(settings, session, fetch) {
    this.settings = settings
    this.session = session
    this.fetch = fetch
    this.oauth2Client = new OAuth2Client(settings.oauthUrl, settings.oauthClientId, fetch)
  }

  /**
   * @param {FetchEvent} event
   * @param {Function} fetch
   */
  handle(event) {
    console.log(`proauth.js Oauth2Handler::handle for ${event.request.url}`)

    const {oauthUrl} = this.settings
    const request = event.request
    const url = request.url
    const isAuthRequest = url === oauthUrl || (url + "/") === oauthUrl
    const oauth = this.oauth2Client
    let tokens = this.session.content || {}

    const updateSession = grantPromise => {
      return grantPromise.then(oA2Response => {
        console.log('proauth.js: authentication sucessful, updating session', oA2Response)
        tokens = this.session.content = oA2Response.toObject()
        return true
      }, oA2Error => {
        console.log('proauth.js: cannot authenticate, clearing session', oA2Error)
        this.session.clear()
        return false
      })
    }

    // If it is not trying to authenticate then attach the access token
    if (!isAuthRequest && tokens.accessToken) {
      request.headers.set("Authorization", `${tokens.tokenType} ${tokens.accessToken}`)
    }

    // Fetch and handle the response
    const fetch = this.fetch
    event.respondWith(fetch(request).then(response => {

      if (response.ok) {
        // Is it an authentication response?
        if (isAuthRequest) {
          return updateSession(
            oauth.handleAuthenticationResponse(response.clone())
          ).then(() => response)
        }
      } else {
        if (response.status === 401 && tokens.refreshToken) {
          // Got 401, but we have a refresh token, so try to get a new access token
          return oauth.refreshToken(tokens.refreshToken).then(authResponse => {
            return updateSession(
              oauth.handleAuthenticationResponse(authResponse)
            ).then(newSession => {
              // We got a new tokens?
              // Then try to re-fetch the original request...
              if (newSession) {
                request.headers.set("Authorization", `${tokens.tokenType} ${tokens.accessToken}`)
                return fetch(request)
              } //...else passthrough the 401 response
              return newSession ? fetch(request) : response
            })
          })
        }
      }

      return response // Passthrough any others
    }))
  }

}
