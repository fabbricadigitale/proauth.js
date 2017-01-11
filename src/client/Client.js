import SessionContainer from "./SessionContainer"
import OAuth2Client from "../common/OAuth2Client"

const sendMessage = (serviceWorker, message) => {
  // This wraps the message posting/response in a promise,
  // which will resolve if the response doesn't
  // contain an error, and reject with the error if it does.
  // If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler
  // independently of a promise, but this is a convenient wrapper.
  return new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(event.data.error)
      } else {
        resolve(event.data)
      }
    }

    // This sends the message data as well as transferring messageChannel.port2
    // to the service worker.
    // The service worker can then use the transferred port to reply via postMessage(),
    // which will in turn trigger the onmessage handler on messageChannel.port1.
    // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage.
    serviceWorker.controller.postMessage(message, [messageChannel.port2])
  });
}

export default class Client {
  /**
   * @typedef {Object} ClientSettings
   * @property {String} namespace
   * @property {String} oauthUrl
   * @property {String} oauthClientId
   * @property {String} sessionStorage
   */

  /**
   * @param {ClientSettings} settings An object containing the client settings
   */
  constructor(settings) {
    const { namespace, sessionStorage } = settings
    this.settings = settings
    this.sessionContainer = new SessionContainer(namespace, window[sessionStorage])
    this._onMessage = (event) => {
      const { broadcast, namespace: ns, command, params } = event.data;
      if (!broadcast || ns !== this.settings.namespace) {
        return
      }

      console.log("proauth.js client received a broadcast message", event.data)

      switch (command) {
      case "session":
        this.sessionContainer.content = params[0];
        break;

      default:
        console.log(`proauth.js client, invalid command received: ${command}.`)
      }

      // (todo): set session race condition must be avoided, dirty-checking data may be a solution
    }
  }

  get ready() {
    return this._serviceWorker && this._ready;
  }

  get serviceWorker() {
    if (!this._serviceWorker) {
      throw Error("proauth.js: serviceWorker has been not registered yet.")
    }
    return this._serviceWorker;
  }

  set serviceWorker(sw) {
    if (this._serviceWorker) {
      this._serviceWorker.removeEventListener("message", this._onMessage)
    }

    this._ready = false
    this._serviceWorker = sw

    sendMessage(sw, {
      namespace: this.settings.namespace,
      command: "init",
      params: [this.settings, this.sessionContainer.content]
    }).then((data) => {
      this._serviceWorker.addEventListener("message", this._onMessage)
      this._ready = !!data
      // (todo): dispatch global ready event
      console.log("proauth.js is ready!")
    })
  }

  setSession(data) {
    return sendMessage(this.serviceWorker, {
      namespace: this.settings.namespace,
      command: "setSession",
      params: [data]
    })
  }

  clearSession() {
    return this.setSession(null)
  }

  hasSession() {
    return !!this.sessionContainer.content;
  }

  login(username, password) {
    if (!this.ready) {
      throw Error("proauth.js is not ready yet.")
    }
    const { oauthUrl, oauthClientId } = this.settings
    return (
      new OAuth2Client(oauthUrl, oauthClientId, window.fetch)
    ).userCredentials(username, password)
  }

}
