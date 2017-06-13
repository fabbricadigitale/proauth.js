import Client from './client/Client'
import absolutePath from './common/absolute-path'

const boot = () => {
  const settings = {
    // Put defaults here
    legacyMode: false,
    serviceSrc: "lib/service.js",
    swSrc: "/service-worker.js",
    swOptions: {},
    oauthUrl: "/oauth",
    oauthClientId: "proauth",
    sessionStorage: "localStorage",
    namespace: document.origin && document.origin !== "null" ? document.origin : "",
    managedUrls: [
      "/" // Manage the current url root by default
    ]
  }

  // Copy user settings
  Object.assign(settings, window.proauth || {})

  // Patch settings
  settings.oauthUrl = absolutePath(settings.oauthUrl)
  for (const k in settings.managedUrls) {
    settings.managedUrls[k] = absolutePath(settings.managedUrls[k])
  }

  const client = new Client(settings)

  delete settings.legacyMode

  return client;
}

export default {
  client: boot()
}
