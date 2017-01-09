class EventTarget { }
const delegate = document.createDocumentFragment();
for (const [, fx] of ["addEventListener", "dispatchEvent", "removeEventListener"].entries()) {
  EventTarget.prototype[fx] = (...xs) => delegate[fx](...xs)
}
export default EventTarget
