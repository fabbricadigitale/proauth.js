import EventTarget from '../common/EventTarget'

const postMessage = (target, aMessage, transferList) => {
  let e = new class extends CustomEvent {
    constructor() {
      super('message', { bubbles: false, cancelable: true })
    }
    get data() {
      return aMessage
    }
    get ports() {
      let ret = [];
      for (let transfer of (transferList || [])) {
        if (transfer instanceof MessagePort) {
          ret.push(transfer)
        }
      }
      return ret.length > 0 ? ret : null
    }
  }
  if (target.onmessage) {
    target.onmessage(e);
  }
  target.dispatchEvent(e);
}

class ServiceWorker extends EventTarget {
  constructor() {
    super()

    // Client context
    // Used to send message from the client to the serviceWoker
    const serviceWorker = this
    this.controller = new class {
      postMessage(...args) {
        return postMessage(serviceWorker, ...args)
      }
    }

    // serviceWorker context
    // the "self" equivalent (a fake of ServiceWorkerGlobalScope),
    // passed to the proauth.service.Controller as serviceWorker's global scope
    const self = this.self = new EventTarget()
    self.clients = {
      matchAll() {
        return new Promise(r => {
          r([{
            postMessage: (...args) => postMessage(self, ...args)
          }])
        })
      }
    }
  }
}

export default ServiceWorker;
