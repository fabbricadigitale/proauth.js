import EventTarget from '../common/EventTarget'

const postMessage = (target, aMessage, transferList) => {

  let ports = [];
  for (let transfer of (transferList || [])) {
    if (transfer instanceof MessagePort) {
      ports.push(transfer)
    }
  }

  let e = new MessageEvent('message', {
    bubbles: false,
    cancelable: true,
    data: aMessage,
    ports: ports.length > 0 ? ports : undefined
  })
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
