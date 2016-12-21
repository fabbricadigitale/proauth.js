export default class OAuth2Error {

  constructor(request, response) {
    this.request = request
    this.response = response
  }

  get canRefresh() {
    return this.status === 401 && this.request.grant_type !== 'refresh_token'
  }

  get status() {
    return this.response.status || null;
  }

  get title() {
    return this.response.title || null;
  }

  get detail() {
    return this.response.detail || null;
  }

}
