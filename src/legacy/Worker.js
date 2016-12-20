export default class Worker {
  constructor() {
    // EventTarget
    var delegate = document.createDocumentFragment();
    [
      'addEventListener',
      'dispatchEvent',
      'removeEventListener'
    ].forEach(f => /*this[f]*/ Worker.prototype[f] = (...xs) => delegate[f](...xs))
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
        (transferList || []).forEach(transfer => {
          if (transfer instanceof MessagePort) {
            ret.push(transfer)
          }
        })
        return ret.length > 0 ? ret : null
      }
    };
    if (this.onmessage) {
      this.onmessage(e);
    }
    this.dispatchEvent(e);
  }

}
