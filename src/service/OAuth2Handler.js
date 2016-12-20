export default class Oauth2Handler {
  constructor(target, fetch) {
    target.addEventListener('fetch', (event) => {
      console.log(`hooking ${event.request.url}`, event);
      event.respondWith(fetch(event.request));
    });
  }

}
