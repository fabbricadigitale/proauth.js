let originalFetch = window.fetch

let fetch = function(input, init) {
  let self = this
  return new Promise((resolve, reject) => {
    let request = new Request(input, init);
    self.dispatchEvent(new (class extends CustomEvent {
      constructor() {
        super('fetch')
      }

      get request() {
        return request
      }

      respondWith(p) {
        resolve(p)
      }
    }))
  })
}

export default {
  install: observer => window.fetch = fetch.bind(observer),
  uninstall: () => window.fetch = originalFetch,
  proxy: fetch,
  fetch: originalFetch
}
