const client = proauth.client

navigator.serviceWorker.register("/service-worker.js")

  .then(() => {
    return navigator.serviceWorker.ready
  })
  .then(() => {
    client.serviceWorker = navigator.serviceWorker
    client.settings.legacyMode = false
  })

export default { client }
