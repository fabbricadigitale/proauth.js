export default class OAuth2Response {

  /**
   * Create an OAuth2.0 response.
   *
   * @param {Response} data The response
   */
  constructor(data) {
    this.accessToken = data.access_token
    this.refreshToken = data.refresh_token
    this.expiresIn = data.expires_in
    this.tokenType = data.token_type
    this.scope = data.scope
  }

  toObject() {
    return Object.assign({}, this)
  }

}
