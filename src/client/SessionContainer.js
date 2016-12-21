export default class SessionContainer {

  /**
   * @param {String} namespace
   * @param {Storage} storage
   */
  constructor(namespace, storage) {
    this.namespace = namespace;
    this.storage = storage;
  }

  get content() {
    return this.storage.getItem(this.namespace)
  }

  set content(data) {
    this.storage.setItem(this.namespace, data)
  }

  clear() {
    this.storage.removeItem(this.namespace)
  }

}
