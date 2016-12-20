
import OAuth2Handler from './OAuth2Handler'
import SessionHandler from './SessionHandler'

export default class Controller {

  /**
   * @param {EventTarget} target
   * @param {Function} fetch
   */
  constructor(target, fetch) {

    this.target = target

    this.handlers = {}


    // Setup interceptor
    target.addEventListener('fetch', event => {
      // TODO route event by url-space
      let ns = event.origin || ""
      if (this.handlers[ns]) {
        this.handlers[ns].handle(event, fetch)
      } else {
        // Short-circuit
        event.respondWith(fetch(event.request));
      }
    })


    target.addEventListener('message', (e) => {
      let {broadcast, namespace, command, params} = e.data,
        reply = (...args) => e.ports[0].postMessage(...args);

      if (broadcast) {
        return // Discard broadcast messages
      }

      try {
        switch (command) {

          case 'init':
            ((config, sessionData = {}) => {
              let ns = config.namespace
              let h = this.handlers[ns]

              if (namespace != ns) {
                throw Error('Invalid config: namespace mismatch')
              }

              // Setup or override handler config/session
              if (h) {
                h = this.getHandlerByNamespace(ns)
                h.config = config
                h.session.content = sessionData
              } else {
                let s = new SessionHandler(ns, this.notifySession.bind(this), sessionData)
                h = this.handlers[ns] = new OAuth2Handler(config, s)
              }

            })(...params)
            reply(true);
            break;

          case 'setSession':
            (data => {
              this.getHandlerByNamespace(namespace).session.content = data;
            })(...params);
            reply(true);
            break;

          default:
            console.log('proauth.js Controller: message discarded', e.data)
            break;

        }
      } catch (error) {
        reply({ error })
      }
    })
  }

  getHandlerByNamespace(namespace) {
    if (!this.handlers[namespace]) {
      throw Error(`No handler found for '${namespace}'`)
    }
    return this.handlers[namespace]
  }

  sendMessage(namespace, command, ...params) {
    this.target.clients.matchAll().then(clients => {
      for (let client of clients) {
        client.postMessage({
          broadcast: true, namespace, command, params
        })
      }
    })
  }

  notifySession(namespace) {
    this.sendMessage(namespace, 'session', this.getHandlerByNamespace(namespace).session.content)
  }



}
