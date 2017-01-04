/**
 * Minimal Event interface implementation
 *
 * Original implementation by Sven Fuchs: https://gist.github.com/995028
 * Modifications and tests by Christian Johansen.
 *
 * @author Sven Fuchs (svenfuchs@artweb-design.de)
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2011 Sven Fuchs, Christian Johansen
 */
import EventTarget from '../common/EventTarget'

let originalXMLHttpRequest = window.XMLHttpRequest

/*
  Cross-browser XML parsing. Used to turn
  XML responses into Document objects
  Borrowed from JSpec
*/
function parseXML(text) {
  let xmlDoc;

  if (typeof DOMParser !== "undefined") {
    let parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml")
  } else {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM")
    xmlDoc.async = "false"
    xmlDoc.loadXML(text)
  }

  return xmlDoc;
}

let responseParser = {
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
let unsafeHeaders = {
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
    throw new Error("INVALID_STATE_ERR");
  }

  if (xhr.sendFlag) {
    throw new Error("INVALID_STATE_ERR");
  }
}


function verifyRequestSent(xhr) {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    throw new Error("Request done");
  }
}

function verifyHeadersReceived(xhr) {
  if (xhr.async && xhr.readyState !== XMLHttpRequest.HEADERS_RECEIVED) {
    throw new Error("No headers received");
  }
}


function verifyResponseBodyType(body) {
  if (typeof body !== "string") {
    var error = new Error("Attempted to respond to fake XMLHttpRequest with " +
      body + ", which is not a string.");
    error.name = "InvalidBodyException";
    throw error;
  }
}

class XMLHttpRequest extends EventTarget {

  constructor() {
    super()
    this.readyState = this.UNSENT
    this.requestHeaders = {}
    this.requestBody = null
    //this.upload = new EventedObject(); // FIXME
    this.async = true
    this.withCredentials = false
  }

  static get UNSENT() { return 0 }
  static get OPENED() { return 1 }
  static get HEADERS_RECEIVED() { return 2 }
  static get LOADING() { return 3 }
  static get DONE() { return 4 }

  get UNSENT() { return 0 }
  get OPENED() { return 1 }
  get HEADERS_RECEIVED() { return 2 }
  get LOADING() { return 3 }
  get DONE() { return 4 }


  get status() {
    return this._response ? this._response.status : 0
  }

  get statusText() {
    return this._response ? this._response.statusText : null
  }

  get response() {
    // https://xhr.spec.whatwg.org/#xmlhttprequest-response
    let type = this.responseType, state = this.readyState
    if (type === "" || type === "text") {
      return state !== this.LOADING && state !== this.DONE ? "" : this._responseBody
    }

    if (state !== this.DONE) {
      return null
    }

    return this._responseBody

  }

  get responseText() {
    let responseType = this.responseType
    if (responseType === "" || responseType === "text") {
      return this._responseBody
    }
    throw new DOMException(
      `Failed to read the 'responseText' property from 'XMLHttpRequest': The value is only accessible if the object's 'responseType' is '' or 'text' (was '${responseType}').`
    )
  }

  get responseXML() {
    let responseType = this.responseType
    if (type !== "" && type !== "document") {
      throw new DOMException(
        `Failed to read the 'responseXML' property from 'XMLHttpRequest': The value is only accessible if the object's 'responseType' is '' or 'document' (was '${responseType}').)`
      )
    }

    if (this.readyState !== this.DONE || text === null) {
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
      return parseXML(this._responseBody)
    } catch (error) {
    }
    return null

  }


  /*
    Duplicates the behavior of native XMLHttpRequest's open function
  */
  open(method, url, async, username, password) {
    this.method = method
    this.url = url
    this.async = typeof async === "boolean" ? async : true
    this.username = username
    this.password = password
    this.requestHeaders = {}
    this.sendFlag = false
    this._readyStateChange(this.OPENED)
  }

  /*
    Duplicates the behavior of native XMLHttpRequest's setRequestHeader function
  */
  setRequestHeader(header, value) {
    verifyState(this);

    if (unsafeHeaders[header] || /^(Sec-|Proxy-)/.test(header)) {
      throw new Error("Refused to set unsafe header \"" + header + "\"")
    }

    if (this.requestHeaders[header]) {
      this.requestHeaders[header] += "," + value
    } else {
      this.requestHeaders[header] = value
    }
  }

  /*
    Duplicates the behavior of native XMLHttpRequest's send function
  */
  send(data) {
    verifyState(this);

    if (!/^(get|head)$/i.test(this.method)) {
      if (!this.requestHeaders["Content-Type"] && !(data || '').toString().match('FormData')) {
        this.requestHeaders["Content-Type"] = "text/plain;charset=UTF-8"
      }

      this.requestBody = data
    }

    this.errorFlag = false
    this.sendFlag = this.async

    if (typeof this.onSend === "function") {
      this.onSend(this)
    }

    this.dispatchEvent(new Event("loadstart", { bubbles: false, cancelable: false }))

    let fetchInit = {
      method: this.method,
      headers: this.requestHeaders,
      body: this.requestBody
      // mode: // NOT supported by xhr
      // credentials: // TODO

    }

    if (this.withCredentials) {
      fetchInit.credentials = "include"
    }

    fetch(this.url, fetchInit).then(response => {
      // TODO: handle abort?
      this._response = response
      this._setResponseHeaders(response.headers)
      this._readyStateChange(this.HEADERS_RECEIVED)
      this._readyStateChange(this.LOADING)

      return response[
        responseParser[this.responseType] || "text"
      ]()
    }, reason => {
      // TODO: handle error?
      this._readyStateChange(this.DONE)
      throw new Error(reason)
    }).then(body => {
      // TODO: handle abort?
      verifyRequestSent(this)
      this._responseBody = body
      this._readyStateChange(this.DONE)
    })

  }

  /*
    Duplicates the behavior of native XMLHttpRequest's abort function
  */
  abort() {
    this.aborted = true
    this.responseText = null
    this.errorFlag = true
    this.requestHeaders = {}

    if (this.readyState > this.UNSENT && this.sendFlag) {
      this._readyStateChange(this.DONE)
      this.sendFlag = false;
    }

    this.readyState = this.UNSENT;

    this.dispatchEvent(new Event("abort", { bubbles: false, cancelable: false }))
    if (typeof this.onerror === "function") {
      this.onerror();
    }
  }

  /*
    Duplicates the behavior of native XMLHttpRequest's getResponseHeader function
  */
  getResponseHeader(header) {
    if (this.readyState < this.HEADERS_RECEIVED) {
      return null
    }

    if (/^Set-Cookie2?$/i.test(header)) {
      return null
    }

    header = header.toLowerCase()

    for (var h in this.responseHeaders) {
      if (h.toLowerCase() === header) {
        return this.responseHeaders[h]
      }
    }

    return null
  }

  /*
    Duplicates the behavior of native XMLHttpRequest's getAllResponseHeaders function
  */
  getAllResponseHeaders() {
    if (this.readyState < this.HEADERS_RECEIVED) {
      return ""
    }

    var headers = ""

    for (var header in this.responseHeaders) {
      if (this.responseHeaders.hasOwnProperty(header) && !/^Set-Cookie2?$/i.test(header)) {
        headers += header + ": " + this.responseHeaders[header] + "\r\n"
      }
    }

    return headers
  }

  /*
   Duplicates the behavior of native XMLHttpRequest's overrideMimeType function
   */
  overrideMimeType(mimeType) {
    if (typeof mimeType === "string") {
      this._forceMimeType = mimeType.toLowerCase()
    }
  }


  /*
    Places a FakeXMLHttpRequest object into the passed
    state.
  */
  _readyStateChange(state) {
    this.readyState = state;

    if (!this.async) {
      return
    }

    // FIXME: Event's target is wrong
    // FIXME: Event should be the same instance

    if (typeof this.onreadystatechange === "function") {
      this.onreadystatechange(new Event("readystatechange"))
    }

    this.dispatchEvent(new Event("readystatechange"))

    if (this.readyState === this.DONE) {
      this.dispatchEvent(new Event("load", { bubbles: false, cancelable: false }))
      this.dispatchEvent(new Event("loadend", { bubbles: false, cancelable: false }))
    }
  }


  /**
   * Sets the FakeXMLHttpRequest object's response headers and places the object into readyState 2
   *
   * @param {Headers} headers
   */
  _setResponseHeaders(headers) {

    this.responseHeaders = {};

    if (this._forceMimeType) {
      headers.set("Content-Type", this._forceMimeType)
    }

    for (let [key, value] of headers.entries()) {
      this.responseHeaders[key] = value
    }
  }


}

export default {
  install: () => window.XMLHttpRequest = XMLHttpRequest,
  uninstall: () => window.XMLHttpRequest = originalXMLHttpRequest,
  XMLHttpRequest: originalXMLHttpRequest
}
