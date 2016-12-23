let originalFetch = window.fetch

let fetch = function(input, init) {
  let self = this
  return new Promise((resolve, reject) => {
    let request = new Request(input, init);
    let fetchEvent = new CustomEvent('fetch');
    fetchEvent.request = request
    fetchEvent.respondWith = resolve
    self.dispatchEvent(fetchEvent)
  })
}

export default {
  install: observer => window.fetch = fetch.bind(observer),
  uninstall: () => window.fetch = originalFetch,
  proxy: fetch,
  fetch: originalFetch
}
