class EventTarget { }
let delegate = document.createDocumentFragment();
for (let [, fx] of ['addEventListener', 'dispatchEvent', 'removeEventListener'].entries()) {
  EventTarget.prototype[fx] = (...xs) => delegate[fx](...xs)
}
export default EventTarget
