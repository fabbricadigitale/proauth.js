export default class Oauth2Handler {

  /**
   * @param {Object} config
   * @param {SessionHandler} session
   */
  constructor (config, session) {
    this.config = config
    this.session = session
  }

  /**
   * @param {FetchEvent} event
   * @param {Function} fetch
   */
  handle (event, fetch) {
    console.log(`Oauth2Handler::handle for ${event.request.url}`)
    console.log('Config', this.config, 'Event', event)
    event.respondWith(fetch(event.request));
  }

}
