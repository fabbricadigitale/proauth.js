const client = proauth.client

const setServiceWorker = (sw) => {
  client.serviceWorker = sw
  client.settings.legacyMode = false
}

if (navigator.serviceWorker) {

  navigator.serviceWorker.register("/service-worker.js")
    .then(() => {
      return navigator.serviceWorker.ready
    })
    .then((registration) => {
      // SW is ready, but its state can be either activating or activated.
      // We must wait until it's activated, so the clients will be claimed.

      console.log(registration.active, registration.active.state)

      if (registration.active.state === "activated") {

        setServiceWorker(navigator.serviceWorker)

      } else {

        registration.active.addEventListener("statechange", () => {
          if (registration.active.state === "activated") {

            setServiceWorker(navigator.serviceWorker)

          }
        })

      }
    })
}

export default { client }
