import absolutePath from "../common/absolute-path"

const originalFetch = window.fetch

const fetch = function (input, init) {
  return new Promise((resolve) => {
    const request = new Request(input, init);

    if (originalFetch.polyfill) {
      // fetch polyfill does not absolutize the url, so...
      request.url = absolutePath(request.url)
    }

    const fetchEvent = new CustomEvent("fetch");
    fetchEvent.request = request
    fetchEvent.respondWith = resolve
    this.dispatchEvent(fetchEvent) // eslint-disable-line no-invalid-this

    // (todo): when to reject?
  })
}

export default {
  install: (observer) => {
    window.fetch = fetch.bind(observer)
  },
  uninstall: () => {
    window.fetch = originalFetch
  },
  fetch: originalFetch
}
