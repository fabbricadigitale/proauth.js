import EventTarget from '../common/EventTarget'

const originalXMLHttpRequest = window.XMLHttpRequest

const _readyState = Symbol('readyState')
const _responseBody = Symbol('responseBody')
const _response = Symbol('response')
const _requestHeaders = Symbol('requestHeaders')
const _method = Symbol('method')
const _url = Symbol('url')
const _username = Symbol('username')
const _password = Symbol('password')
const _sendFlag = Symbol('sendFlag')
const _errorFlag = Symbol('errorFlag')
const _forceMimeType = Symbol('forceMimeType')
const _responseHeaders = Symbol('responseHeaders')
const _aborted = Symbol('aborted')
const _withCredentials = Symbol('withCredentials')

const responseParser = {
  "": "text",
  "arraybuffer": "arrayBuffer",
  "blob": "blob",
  "json": "json",
  "text": "text"
}

/*
  Without mocking, the native XMLHttpRequest object will throw
  an error when attempting to set these headers. We match this behavior.
*/
const unsafeHeaders = {
  "Accept-Charset": true,
  "Accept-Encoding": true,
  "Connection": true,
  "Content-Length": true,
  "Cookie": true,
  "Cookie2": true,
  "Content-Transfer-Encoding": true,
  "Date": true,
  "Expect": true,
  "Host": true,
  "Keep-Alive": true,
  "Referer": true,
  "TE": true,
  "Trailer": true,
  "Transfer-Encoding": true,
  "Upgrade": true,
  "User-Agent": true,
  "Via": true
}

function verifyState(xhr) {
  if (xhr.readyState !== XMLHttpRequest.OPENED) {
    throw new Error("INVALID_STATE_ERR")
  }

  if (xhr[_sendFlag]) {
    throw new Error("INVALID_STATE_ERR")
  }
}

/*
  Cross-browser XML parsing. Used to turn
  XML responses into Document objects
  Borrowed from JSpec
*/
function parseXML(text) {
  let xmlDoc

  if (typeof DOMParser !== "undefined") {
    let parser = new DOMParser()
    xmlDoc = parser.parseFromString(text, "text/xml")
  } else {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM")
    xmlDoc.async = "false"
    xmlDoc.loadXML(text)
  }

  return xmlDoc
}

/**
  * Places a XMLHttpRequest object into the passed state.

  * @param {XMLHttpRequest} xhr
  * @param {string} state
  */
function readyStateChange(xhr, state) {
  xhr[_readyState] = state
  xhr.dispatchEvent(new Event("readystatechange"))
}

class XMLHttpRequest extends originalXMLHttpRequest {

  constructor() {
    super()
    this[_readyState] = this.UNSENT
    this[_requestHeaders] = {}

    //this.upload = new EventedObject() // FIXME
    this[_withCredentials] = false
  }

  get readyState() {
    return this[_readyState]
  }

  get status() {
    return this[_response] ? this[_response].status : 0
  }

  get statusText() {
    return this[_response] ? this[_response].statusText : null
  }

  get response() {
    // https://xhr.spec.whatwg.org/#xmlhttprequest-response
    let type = this.responseType, state = this[_readyState]
    if (type === "" || type === "text") {
      return state !== this.LOADING && state !== this.DONE ? "" : this[_responseBody]
    }

    if (state !== this.DONE) {
      return null
    }

    return this[_responseBody]

  }

  get responseURL() {
    if (this[_response] && this.readyState === this.DONE) {
      return this[_response].url
    }

    return ""
  }

  get responseText() {
    let responseType = this.responseType
    if (responseType === "" || responseType === "text") {
      return this[_responseBody]
    }
    throw new DOMException(
      `Failed to read the 'responseText' property from 'XMLHttpRequest': The value is only accessible if the object's 'responseType' is '' or 'text' (was '${responseType}').`
    )
  }

  get responseXML() {
    let responseType = this.responseType
    if (responseType !== "" && responseType !== "document") {
      throw new DOMException(
        `Failed to read the 'responseXML' property from 'XMLHttpRequest': The value is only accessible if the object's 'responseType' is '' or 'document' (was '${responseType}').)`
      )
    }

    let body = this[_responseBody]

    if (this[_readyState] !== this.DONE || body === null) {
      return null
    }

    let finalMimeType = this.getResponseHeader("Content-Type")

    if (finalMimeType !== null && !(/(text\/html)|(text\/xml)|(application\/xml)|(\+xml)/.test(finalMimeType))) {
      return null
    }

    if (responseType === "" && finalMimeType === "text/html") {
      return null
    }

    try {
      return parseXML(body)
    } catch (error) {
    }
    return null

  }

  get withCredentials() {
    return this[_withCredentials]
  }

  set withCredentials(enable) {
    this[_withCredentials] = !!enable
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's open function
   */
  open(method, url, async = true, username, password) {

    if (!async) {
      console && console.log && console.log("Forcing 'async' to false is not supported")
    }

    this[_method] = method
    this[_url] = url
    this[_username] = username
    this[_password] = password
    this[_requestHeaders] = {}
    this[_sendFlag] = false
    readyStateChange(this, this.OPENED)
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's setRequestHeader function
   */
  setRequestHeader(header, value) {
    verifyState(this)

    if (unsafeHeaders[header] || /^(Sec-|Proxy-)/.test(header)) {
      throw new Error("Refused to set unsafe header \"" + header + "\"")
    }

    if (this[_requestHeaders][header]) {
      this[_requestHeaders][header] += "," + value
    } else {
      this[_requestHeaders][header] = value
    }
  }

  /**
   *  Duplicates the behavior of native XMLHttpRequest's send function
   */
  send(data) {
    verifyState(this)
    this[_errorFlag] = false
    this[_sendFlag] = true

    this.dispatchEvent(new ProgressEvent("loadstart", { bubbles: false, cancelable: false }))
    //this.dispatchEvent(new ProgressEvent("progress", { bubbles: false, cancelable: false }))

    let fetchInit = {
      method: this[_method],
      headers: this[_requestHeaders],
      body: data
      // mode: // NOT supported by xhr
      // credentials: // TODO
    }

    if (this[_withCredentials]) {
      fetchInit.credentials = "include"
    }

    fetch(this[_url], fetchInit).then(response => {

      this[_response] = response

      // HEADERS_RECEIVED Stage
      let headers = response.headers
      this[_responseHeaders] = {}
      for (let [key, value] of headers.entries()) {
        if (this[_forceMimeType] && key.toLowerCase() === "content-type") {
          this[_responseHeaders][key] = this[_forceMimeType]
        } else {
          this[_responseHeaders][key] = value
        }
      }

      readyStateChange(this, this.HEADERS_RECEIVED)

      // LOADING Stage
      readyStateChange(this, this.LOADING)
      this.dispatchEvent(new ProgressEvent("progress", { bubbles: false, cancelable: false }))
      // FIXME: we need body size?
      //this.dispatchEvent(new ProgressEvent("progress", { bubbles: false, cancelable: false }))
      return response[
        responseParser[this.responseType] || "text"
      ]()
    }, reason => {
      if (!this[_aborted]) {
        readyStateChange(this, this.DONE)
        this.dispatchEvent(new ProgressEvent("error", { bubbles: false, cancelable: false }))
      }
      this.dispatchEvent(new ProgressEvent("loadend", { bubbles: false, cancelable: false }))
    }).then(body => {
      // DONE Stage
      if (!this[_aborted]) {
        this[_responseBody] = body
        this[_sendFlag] = false
        readyStateChange(this, this.DONE)
        this.dispatchEvent(new ProgressEvent("load", { bubbles: false, cancelable: false }))
      }
      this.dispatchEvent(new ProgressEvent("loadend", { bubbles: false, cancelable: false }))
    })
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's abort function
   */
  abort() {
    this[_aborted] = true
    this[_errorFlag] = true
    this[_requestHeaders] = {}

    if (this[_readyState] > this.UNSENT && this[_sendFlag]) {
      readyStateChange(this, this.DONE)
      this[_sendFlag] = false
    }

    this[_readyState] = this.UNSENT

    this.dispatchEvent(new ProgressEvent("abort", { bubbles: false, cancelable: false }))
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's getResponseHeader function
   */
  getResponseHeader(header) {
    if (this[_readyState] < this.HEADERS_RECEIVED) {
      return null
    }

    if (/^Set-Cookie2?$/i.test(header)) {
      return null
    }

    header = header.toLowerCase()

    for (var h in this[_responseHeaders]) {
      if (h.toLowerCase() === header) {
        return this[_responseHeaders][h]
      }
    }

    return null
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's getAllResponseHeaders function
   */
  getAllResponseHeaders() {
    if (this[_readyState] < this.HEADERS_RECEIVED) {
      return ""
    }

    var headers = ""

    for (var header in this[_responseHeaders]) {
      if (this[_responseHeaders].hasOwnProperty(header) && !/^Set-Cookie2?$/i.test(header)) {
        headers += header + ": " + this[_responseHeaders][header] + "\r\n"
      }
    }

    return headers
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's overrideMimeType function
   */
  overrideMimeType(mimeType) {
    if (typeof mimeType === "string") {
      this[_forceMimeType] = mimeType.toLowerCase()
    }
  }

}

export default {
  install: () => window.XMLHttpRequest = XMLHttpRequest,
  uninstall: () => window.XMLHttpRequest = originalXMLHttpRequest,
  XMLHttpRequest: originalXMLHttpRequest
}
