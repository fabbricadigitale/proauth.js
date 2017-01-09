import absolutePath from "../common/absolutePath"
const originalFetch = window.fetch

const fetch = function (input, init) {
  const self = this
  return new Promise((resolve, reject) => {
    const request = new Request(input, init);

    if (originalFetch.polyfill) {
      // fetch polyfill does not absolutize the url, so...
      request.url = absolutePath(request.url)
    }

    const fetchEvent = new CustomEvent("fetch");
    fetchEvent.request = request
    fetchEvent.respondWith = resolve
    self.dispatchEvent(fetchEvent)
  })
}

let boundFetch;

export default {
  install: (observer) => window.fetch = fetch.bind(observer),
  uninstall: () => window.fetch = originalFetch,
  fetch: originalFetch
}
