import OAuth2Response from './OAuth2Response'
import OAuth2Error from './OAuth2Error'

export default class OAuth2Client {
  /**
   * Constructor
   * @param {string} apiUrl The url of OAuth2 endpoint
   * @param {string} clientId
   * @return {OAuth2Client}
   */
  constructor(apiUrl, clientId) {

    /** @type {string} */
    this.apiUrl = apiUrl;

    /** @type {string} */
    this.clientId = clientId;
  }

  /**
   *
   * @param {Object} params
   * @param {String} code
   * @returns {Promise}
   * @private
   */
  grantAccessToken(params) {
    return fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(params)
      }).then((response) => {
        if (response.ok) {
          // Authentication OK
          return response.json().then(j => new OAuth2Response(j))
        }

        // Authentication refused
        return response.json().then(j => Promise.reject(new OAuth2Error(params, j)))
      })
  }

  /**
   * @param username
   * @param password
   * @returns {Promise}
   */
  userCredentials(username, password) {
    return this.grantAccessToken({
      'client_id': this.clientId,
      'grant_type': 'password',
      'username': username,
      'password': password
    });
  }

  /**
   *
   * @returns {Promise}
   */
  refreshToken(refreshToken) {
    return this.grantAccessToken({
      'client_id': this.clientId,
      'grant_type': 'refresh_token',
      'refresh_token': refreshToken
    });
  }

}
