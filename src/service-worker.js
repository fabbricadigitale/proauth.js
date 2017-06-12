import Controller from "./service/Controller"

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim())
})

const controller = new Controller(self, fetch)

const service = { controller }

export { service }
