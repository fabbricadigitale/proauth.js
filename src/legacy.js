import fetch from './legacy/fetch'
import xhr from './legacy/xhr'
import ServiceWorker from './legacy/ServiceWorker'
import Controller from './service/Controller'

// Init elements for legacy mode
const serviceWorker = new ServiceWorker(); // Fake serviceWorker
fetch.install(serviceWorker.self);  // FetchAPI proxy

xhr.install(); // XMLHttpRequest to FetchAPI proxy

// Setup service environment
const controller = new Controller(serviceWorker.self, fetch.fetch);
proauth.client.serviceWorker = serviceWorker;

const legacy = { fetch, xhr, serviceWorker }
const service = { controller }
export default { legacy, service, client: proauth.client }
