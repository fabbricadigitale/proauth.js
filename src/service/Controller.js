import OAuth2Handler from './OAuth2Handler'
import SessionHandler from './SessionHandler'

export default class Controller {

  /**
   * @param {EventTarget} globalScope
   * @param {Function} fetch
   */
  constructor(globalScope, fetch) {

    this.globalScope = globalScope

    if (!fetch) {
      fetch = globalScope.fetch
    }

    this.handlers = {}


    // Setup interceptor
    globalScope.addEventListener('fetch', event => {

      for (let ns in this.handlers) {
        let handler = this.handlers[ns]
        for (let [, url] of handler.settings.managedUrls.entries()) {
          if (event.request.url.startsWith(url)) {
            // Each managed url should be handle by just one handler,
            // further registered handler on the same url are discarded.
            // TBD Should be a warning/error thrown in case of multiple handlers?
            return handler.handle(event)
          }
        }
      }

      // Passthrough unmanaged requests
      event.respondWith(fetch(event.request));
    })


    globalScope.addEventListener('message', (e) => {
      let {broadcast, namespace, command, params} = e.data,
        reply = (...args) => e.ports[0].postMessage(...args);

      if (broadcast) {
        return // Discard broadcast messages
      }

      try {
        switch (command) {

          case 'init':
            ((settings, sessionData = {}) => {
              let ns = settings.namespace
              let h = this.handlers[ns]

              if (namespace != ns) {
                throw Error('Invalid settings: namespace mismatch')
              }

              // Setup or override handler settings and session data
              if (h) {
                h = this.getHandlerByNamespace(ns)
                h.settings = settings
                h.session.content = sessionData
              } else {
                let s = new SessionHandler(ns, this.notifySession.bind(this), sessionData)
                h = this.handlers[ns] = new OAuth2Handler(settings, s, fetch)
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
        reply({
          namespace,
          error: {
            message: String(error.message),
            stack: String(error.stack)
          }
        })
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
    this.globalScope.clients.matchAll().then(clients => {
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
