export default class Worker {
  constructor() {
    // EventTarget
    var delegate = document.createDocumentFragment();
    for (let [, fx] of [ 'addEventListener', 'dispatchEvent', 'removeEventListener'].entries()) {
      Worker.prototype[fx] = (...xs) => delegate[fx](...xs)
    }
  }
  postMessage(aMessage, transferList) {
    let e = new class extends CustomEvent {
      constructor() {
        super('message', { bubbles: false, cancelable: true })
      }
      get data() {
        return aMessage
      }
      get ports() {
        let ret = []
	for (let [, transfer] of (transferList || []).entries()) {
	  if (transfer instanceof MessagePort) {
	    ret.push(transfer)
	  }
	}
        return ret.length > 0 ? ret : null
      }
    };
    if (this.onmessage) {
      this.onmessage(e);
    }
    this.dispatchEvent(e);
  }

}
