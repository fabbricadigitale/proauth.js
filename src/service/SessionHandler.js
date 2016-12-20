export default class SessionContainer {

  /**
   * @param {String} namespace
   * @param {Function} notify
   * @param {Object} data
   */
  constructor(namespace, notify, data = {}) {
    this.notify = () => notify(namespace)
    this._content = Object(data)
  }

  get content() {
    return this._content
  }

  set content(data) {
    this._content = Object(data)
    this.notify()
  }

  clear () {
    this.content = {};
  }

}
