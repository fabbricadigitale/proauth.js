export default class OAuth2Handler {
  constructor(fetch) {
    this.handler = (event) => {
      console.log(`hooking ${event.request.url}`);
      event.respondWith(fetch(event.request));
    }
  }
  register(target) {
    target.addEventListener('fetch', this.handler.bind(this));
  }
}
