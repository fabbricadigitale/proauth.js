import absolutePath from '../common/absolutePath'
let originalFetch = window.fetch

let fetch = function(input, init) {
  let self = this
  return new Promise((resolve, reject) => {
    let request = new Request(input, init);

    if (originalFetch.polyfill) {
      // fetch polyfill does not absolutize the url, so...
      request.url = absolutePath(request.url)
    }

    let fetchEvent = new CustomEvent('fetch');
    fetchEvent.request = request
    fetchEvent.respondWith = resolve
    self.dispatchEvent(fetchEvent)
  })
}

let boundFetch;

export default {
  install: observer => window.fetch = fetch.bind(observer),
  uninstall: () => window.fetch = originalFetch,
  fetch: originalFetch
}
