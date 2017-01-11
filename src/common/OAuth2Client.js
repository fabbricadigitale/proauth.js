import OAuth2Response from "./OAuth2Response"
import OAuth2Error from "./OAuth2Error"

export default class OAuth2Client {

  /**
   * Create an OAuth2.0 client instance.
   *
   * @param {string} apiUrl The url of OAuth2 endpoint
   * @param {string} clientId A string identifying the instance of the client
   * @param {Function} fetch The fetch function the client will use
   */
  constructor(apiUrl, clientId, fetch) {

    /** @type {string} */
    this.apiUrl = apiUrl;

    /** @type {string} */
    this.clientId = clientId;

    this.fetch = (init) => {
      return fetch(this.apiUrl, init)
    }

  }

  handleAuthenticationResponse(response) {
    if (response.ok) {
      // Authentication OK
      return response.json().then((j) => new OAuth2Response(j))
    }

    // Authentication refused
    return response.json().then((j) => Promise.reject(new OAuth2Error(j)))
  }

  /**
   * Grant an access token.
   *
   * @param {Object} params AN object containing the parameters to post to the OAuth2 endpoint
   * @return {Promise} A promise
   * @private
   */
  grantAccessToken(params) {
    return this.fetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(params)
    })
  }

  /**
   * Grant a token for an user.
   *
   * @param {String} username The user for which to request a token
   * @param {String} password The password to authenticate such user
   * @return {Promise} A promise
   */
  userCredentials(username, password) {
    return this.grantAccessToken({
      "client_id": this.clientId,
      "grant_type": "password",
      username,
      password
    });
  }

  /**
   * Refresh an overdue token.
   *
   * @param {String} refreshToken The token to refresh
   * @return {Promise} A promise
   */
  refreshToken(refreshToken) {
    return this.grantAccessToken({
      "client_id": this.clientId,
      "grant_type": "refresh_token",
      "refresh_token": refreshToken
    });
  }

}
