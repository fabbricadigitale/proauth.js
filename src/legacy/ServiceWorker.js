import EventTarget from "../common/EventTarget"

const postMessage = (target, aMessage, transferList) => {

  const ports = [];
  for (const transfer of transferList || []) {
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

export default class ServiceWorker extends EventTarget {

  /**
   * Creatre a custom worker.
   */
  constructor() {
    super()

    // Service worker context.
    // Ie., A fake of ServiceWorkerGlobalScope.
    // The variable `globalScope` is equivalent to the `self` field of the Service Worker.
    // It will be used by the proauth.service.Controller as the ServiceWorker's global scope object.
    const globalScope = new EventTarget()

    const self = this
    globalScope.clients = {
      matchAll() {
        return new Promise((resolve) => {
          resolve([{
            postMessage: (...args) => postMessage(self, ...args)
          }])
        })
      }
    }

    // Client context
    // Used to send message from the client to the service worker
    this.controller = new class {
      postMessage(...args) {
        return postMessage(globalScope, ...args)
      }
    }()

    this.self = globalScope

  }
}
