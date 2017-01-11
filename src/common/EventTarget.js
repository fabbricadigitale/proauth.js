class EventTarget {
  constructor() {
    const delegate = document.createDocumentFragment();
    for (const [, fx] of [ 'addEventListener', 'dispatchEvent', 'removeEventListener'].entries()) {
      this[fx] = (...xs) => delegate[fx](...xs)
    }
  }
}
export default EventTarget
