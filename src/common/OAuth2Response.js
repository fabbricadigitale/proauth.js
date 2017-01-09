export default class OAuth2Response {

  constructor(data) {
    this.accessToken = data.access_token
    this.refreshToken = data.refresh_token
    this.expiresIn = data.expires_in
    this.tokenType = data.token_type
    this.scope = data.scope
  }

  toObject() {
    const o = {}
    Object.assign(o, this)
    return o
  }

}
