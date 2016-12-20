

function sendMessage(service, message) {
  // This wraps the message posting/response in a promise, which will resolve if the response doesn't
  // contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler independently of a promise, but this is
  // a convenient wrapper.
  return new Promise(function(resolve, reject) {
    var messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = function(event) {
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
    service.controller.postMessage(message,
      [messageChannel.port2]);
  });
}


export default class Client {
  constructor(config) {
    this._config = config;
  }

  get ready() {
    return this._service && this._ready;
  }

  get service() {
    if (!this._service) {
      throw Error('proauth.js is not ready: service has been not registered yet.')
    }
    return this._service;
  }

  set service(c) {
    this._service = c
    this._ready = false
    sendMessage(c, {
      command: "init",
      params: [this._config]
    }).then((data) => {
      this._ready = !!data
      //TODO: dispatch global READY event
      console.log('proauth.js is ready!')
    })
  }

  hasSession() {
    return sendMessage(this.service, {
      command: "hasSession"
    })
  }

  clearSession() {
    return sendMessage(this.service, {
      command: "clearSession"
    })
  }


}
