class ServiceWorker {
  constructor() {
    let serviceWorker = this
    // Controller
    this.controller = new class {
      postMessage(aMessage, transferList) {
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
        if (serviceWorker.onmessage) {
          serviceWorker.onmessage(e);
        }
        serviceWorker.dispatchEvent(e);
      }
    }

    this.clients = {
      matchAll() {
        return new Promise(r => {
          r([{
            postMessage: serviceWorker.controller.postMessage
          }])
        })
      }
    }
  }

}

// EventTarget
let delegate = document.createDocumentFragment();
for (let [, fx] of ['addEventListener', 'dispatchEvent', 'removeEventListener'].entries()) {
  ServiceWorker.prototype[fx] = (...xs) => delegate[fx](...xs)
}

export default ServiceWorker;
