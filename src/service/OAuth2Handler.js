export default class Oauth2Handler {
  constructor(fetch) {
    this.handler = (event) => {
      console.log('Hook for: ', event.request.url);
      event.respondWith(fetch(event.request));
    }
  }
  register(target) {
    target.addEventListener('fetch', this.handler.bind(this));
  }
}
