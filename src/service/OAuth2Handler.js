export default class Oauth2Handler {

  /**
   * @param {Object} settings
   * @param {SessionHandler} session
   */
  constructor (settings, session) {
    this.settings = settings
    this.session = session
  }

  /**
   * @param {FetchEvent} event
   * @param {Function} fetch
   */
  handle (event, fetch) {
    console.log(`Oauth2Handler::handle for ${event.request.url}`)
    console.log('Settings', this.settings, 'Event', event)
    event.respondWith(fetch(event.request));
  }

}
