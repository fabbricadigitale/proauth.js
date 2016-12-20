import fetch from './legacy/fetch'
import Worker from './legacy/Worker'
import Controller from './service/Controller'

// Init legacy elements
let worker = new Worker(); // Fake serviceWorker
fetch.install(worker);  // FetchAPI proxy

// Setup service environment
let controller = new Controller(worker, fetch.fetch);
proauth.client.service = worker;

const legacy = { fetch, worker, controller }
export default { legacy, client: proauth.client }
