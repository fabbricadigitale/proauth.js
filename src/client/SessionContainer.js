export default class SessionContainer {

  /**
   * Create a session container.
   *
   * @param {String} namespace The namespace
   * @param {Storage} storage The session storage
   */
  constructor(namespace, storage) {
    this.namespace = namespace;
    this.storage = storage;
  }

  get content() {
    try {
      return JSON.parse(this.storage.getItem(this.namespace))
    } catch (error) {
      console.log("proauth.js SessionContainer: invalid storage data, ignored")
    }
    return null
  }

  set content(data) {
    if (data) {
      console.log("proauth.js: session data updated:", data)
      this.storage.setItem(this.namespace, JSON.stringify(data || null))
    } else {
      this.clear()
    }
  }

  clear() {
    console.log("proauth.js: session data cleared")
    this.storage.removeItem(this.namespace)
  }

}
