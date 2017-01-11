export default class OAuth2Error {

  /**
   * Create an OAuth2.0 error.
   *
   * @param {Response} response The response
   */
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
