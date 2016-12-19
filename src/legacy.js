import fetch from './legacy/fetch'
import Worker from './legacy/Worker'
import OAuth2Handler from './service/OAuth2Handler'
const legacy = {fetch, Worker, OAuth2Handler}
export default { legacy }
