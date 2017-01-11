export default class EventTarget {

  /**
   * Create an event target.
   */
  constructor() {
    const delegate = document.createDocumentFragment();
    for (const fx of [ "addEventListener", "dispatchEvent", "removeEventListener"]) {
      this[fx] = (...xs) => delegate[fx](...xs)
    }
  }

}
