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

const boot = () => {
  let settings = {
    // Put defaults here
    legacyMode: false,
    legacyScript: "lib/legacy.js", // FIXME: default path should be computed
    namespace: document.origin && document.origin != "null" ? document.origin : ""
  };
  // Copy user settings
  Object.assign(settings, window.proauth || {});

  const client = new Client(settings);

  if (!settings.legacyMode && 'serviceWorker' in navigator) {
    // Default mode
  } else {
    // Legacy mode
    settings.legacyMode = true;
    loadScript(settings.legacyScript)
  }

  return client;
}

export default {
  client: boot()
}
