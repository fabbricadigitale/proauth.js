export default class OAuth2Error {

  constructor(response) {
    this.response = response
  }

  get status() {
    return this.response.status || null
  }

  get title() {
    return this.response.title || null
  }

  get detail() {
    return this.response.detail || null
  }

}
