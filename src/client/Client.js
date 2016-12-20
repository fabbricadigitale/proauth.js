let sendMessage = (serviceWorker, message) => {
  // This wraps the message posting/response in a promise, which will resolve if the response doesn't
  // contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler independently of a promise, but this is
  // a convenient wrapper.
  return new Promise((resolve, reject) => {
    let messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = event => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    // This sends the message data as well as transferring messageChannel.port2 to the service worker.
    // The service worker can then use the transferred port to reply via postMessage(), which
    // will in turn trigger the onmessage handler on messageChannel.port1.
    // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
    serviceWorker.controller.postMessage(message,
      [messageChannel.port2]);
  });
}

let onMessage = function (event) {
  let {broadcast, namespace, command, params} = event.data;
  if (!broadcast || namespace != this._config.namespace) {
    return
  }
  console.log('proauth.js client received a broadcast message', event.data)
  // TODO: set session race condition must be avoided, dirty-checking data may be a solution
}

export default class Client {
  constructor(config) {
    this._config = config;
  }

  get ready() {
    return this._serviceWorker && this._ready;
  }

  get serviceWorker() {
    if (!this._serviceWorker) {
      throw Error('proauth.js is not ready: service has been not registered yet.')
    }
    return this._serviceWorker;
  }

  set serviceWorker(sw) {
    if (this._serviceWorker) {
      this._serviceWorker.removeEventListener('message', this.onmessage);
    }

    this._ready = false
    this._serviceWorker = sw

    sendMessage(sw, {
      namespace: this._config.namespace,
      command: "init",
      params: [this._config]
    }).then(data => {
      this._serviceWorker.addEventListener('message', onMessage.bind(this))
      this._ready = !!data
      //TODO: dispatch global READY event
      console.log('proauth.js is ready!')
    })
  }

  setSession(data) {
    return sendMessage(this.serviceWorker, {
      namespace: this._config.namespace,
      command: "setSession",
      params: [this._config.namespace, data]
    })
  }

  clearSession() {
    return this.setSession({})
  }

}
