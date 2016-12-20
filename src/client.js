import Client from './client/Client'

let loadScript = (url, callback = () => { }) => {
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}

var boot = () => {
  let settings = {
    // Put defaults here
    legacyMode: false,
    legacyScript: "lib/legacy.js" // FIXME: default path should be computed
  };
  // Copy user settings
  Object.assign(settings, window.proauth || {});

  let client = new Client(settings);

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
