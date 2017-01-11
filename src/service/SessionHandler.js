export default class SessionContainer {

  /**
   * Create a session container.
   *
   * @param {String} namespace The namespace
   * @param {Function} notify The notifier
   * @param {Object} data The content
   */
  constructor(namespace, notify, data) {
    this.notify = () => notify(namespace)
    this._content = data ? Object(data) : null
  }

  get content() {
    return this._content
  }

  set content(data) {
    this._content = data ? Object(data) : null
    this.notify()
  }

  clear() {
    this.content = null;
  }

}
