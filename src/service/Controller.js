
import OAuth2Handler from './OAuth2Handler'

export default class Controller {
  constructor(target, fetch) {

    var init = (controller, target, fetch, config) => {
      controller.session = {}
      controller.handler = new OAuth2Handler(target, fetch);
    }

    target.addEventListener('message', (e) => {
      let command = e.data.command,
          params = e.data.params,
          reply = (...args) => e.ports[0].postMessage(...args);

      try {
        switch (command) {

          case 'init':
            init(this, target, fetch, ...params);
            reply(true);
            break;

          case 'hasSession':
            reply(this.handler);
            break;

          case 'clearSession':
            this.clearSession();
            reply(true);
            break;
        }
      } catch(error) {
        reply({error})
      }
    })
  }

  get ready() {
    return this.session && this.handler
  }

  get hasSession() {
    return this.ready && this.session.hasSession;
  }

  clearSession() {
    if (!this.ready) {
      throw Error('proauth.js is not ready: controller has been not initialized yet.')
    }
    this.session.clear();
  }
}
