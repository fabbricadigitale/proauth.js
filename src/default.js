import proauthClient from "./client"

const client = proauthClient.client

if (navigator.serviceWorker) {

  if (client.settings.swSrc) {
    navigator.serviceWorker.register(client.settings.swSrc, client.settings.swOptions)
  }

  navigator.serviceWorker.ready.then((registration) => {
    // SW is ready, but its state can be either activating or activated.
    // We must wait until it's activated, so the clients will be claimed.

    if (registration.active.state === "activated") {

      client.serviceWorker = navigator.serviceWorker

    } else {

      registration.active.addEventListener("statechange", () => {
        if (registration.active.state === "activated") {

          client.serviceWorker = navigator.serviceWorker

        }
      })

    }
  })
}

export default { client }
