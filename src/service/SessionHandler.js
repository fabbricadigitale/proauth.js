export default class SessionContainer {

  /**
   * @param {String} namespace
   * @param {Function} notify
   * @param {Object} data
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

  clear () {
    this.content = null;
  }

}
