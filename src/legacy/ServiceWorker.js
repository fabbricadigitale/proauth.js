import EventTarget from "../common/EventTarget"

const postMessage = (target, aMessage, transferList) => {

  const ports = [];
  for (const transfer of (transferList || [])) {
    if (transfer instanceof MessagePort) {
      ports.push(transfer)
    }
  }

  const e = new MessageEvent("message", {
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



    // serviceWorker context
    // the "self" equivalent (a fake of ServiceWorkerGlobalScope),
    // passed to the proauth.service.Controller as serviceWorker's global scope
    const self = this.self = new EventTarget()

    const _this = this
    self.clients = {
      matchAll() {
        return new Promise((resolve) => {
          resolve([{
            postMessage: (...args) => postMessage(_this, ...args)
          }])
        })
      }
    }

    // Client context
    // Used to send message from the client to the serviceWoker
    const serviceWorker = this
    this.controller = new class {
      postMessage(...args) {
        return postMessage(self, ...args)
      }
    }

  }
}

export default ServiceWorker;
