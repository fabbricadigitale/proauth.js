import Client from './client/Client'

const loadScript = (url, callback = () => { }) => {
  // Adding the script tag to the head as suggested before
  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}

const absolutePath = href => {
    var link = document.createElement("a")
    link.href = href
    return (link.protocol+"//"+link.host+link.pathname+link.search+link.hash)
}


const boot = () => {
  let settings = {
    // Put defaults here
    legacyMode: false,
    legacySrc: "lib/legacy.js", // FIXME: default path should be computed
    serviceSrc: "lib/service.js",
    oauthUrl: "/oauth",
    oauthClientId: "proauth",
    sessionStorage: window.localStorage,
    namespace: document.origin && document.origin != "null" ? document.origin : "",
    managedUrls: [
      "/" // Manage the current url root by default
    ]
  };

  // Copy user settings
  Object.assign(settings, window.proauth || {});

  // Patch settings
  settings.oauthUrl = absolutePath(settings.oauthUrl)
  for (let k in settings.managedUrls) {
    settings.managedUrls[k] = absolutePath(settings.managedUrls[k])
  }

  const client = new Client(settings);

  if (!settings.legacyMode && 'serviceWorker' in navigator) {
    // Default mode
  } else {
    // Legacy mode
    settings.legacyMode = true;
    loadScript(settings.legacySrc)
  }

  return client;
}

export default {
  client: boot()
}
