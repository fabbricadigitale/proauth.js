const originalXMLHttpRequest = window.XMLHttpRequest

const _readyState = Symbol("readyState")
const _responseBody = Symbol("responseBody")
const _response = Symbol("response")
const _requestHeaders = Symbol("requestHeaders")
const _method = Symbol("method")
const _url = Symbol("url")
const _username = Symbol("username")
const _password = Symbol("password")
const _sendFlag = Symbol("sendFlag")
const _errorFlag = Symbol("errorFlag")
const _forceMimeType = Symbol("forceMimeType")
const _responseHeaders = Symbol("responseHeaders")
const _aborted = Symbol("aborted")
const _withCredentials = Symbol("withCredentials")

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
  "accept-charset": true,
  "accept-encoding": true,
  "connection": true,
  "content-length": true,
  "cookie": true,
  "cookie2": true,
  "content-transfer-encoding": true,
  "date": true,
  "expect": true,
  "host": true,
  "keep-alive": true,
  "referer": true,
  "te": true,
  "trailer": true,
  "transfer-encoding": true,
  "upgrade": true,
  "user-agent": true,
  "via": true
}

const throwMethodError = function (method, message) {
  throw new Error(`Failed to execute '${method}' on 'XMLHttpRequest': ${message}.`)
}

const throwReadPropError = function (property, message) {
  throw new Error(`Failed to read the '${property}' property from 'XMLHttpRequest': ${message}.`)
}

const verifyState = function (xhr, method) {
  if (xhr.readyState !== XMLHttpRequest.OPENED) {
    throwMethodError(method, "The object's state must be OPENED")
  }

  if (xhr[_sendFlag]) {
    throwMethodError(method, "Already sent")
  }
}

/*
  Cross-browser XML parsing. Used to turn
  XML responses into Document objects
  Borrowed from JSpec
*/
const parseXML = function (text) {
  let xmlDoc = null

  if (typeof DOMParser !== "undefined") {
    const parser = new DOMParser()
    xmlDoc = parser.parseFromString(text, "text/xml")

    // Return an XML parse error to get namespace of "parsererror" tag
    const parsererrorNS = parser.parseFromString("INVALID", "text/xml")
      .getElementsByTagName("parsererror")[0].namespaceURI

    // Check if xmlDoc resulted in an XML parse error
    if (xmlDoc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0) {
      return null
    }
  } else {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM") // eslint-disable-line no-undef
    xmlDoc.async = "false"
    xmlDoc.loadXML(text)
  }

  return xmlDoc
}

/**
 * Places a XMLHttpRequest object into the passed state.
 *
 * @param {XMLHttpRequest} xhr The XHR object
 * @param {string} state The ready state
 * @return {void}
 */
const readyStateChange = function (xhr, state) {
  xhr[_readyState] = state
  xhr.dispatchEvent(new Event("readystatechange"))
}

class XMLHttpRequestToFetch extends XMLHttpRequest {

  get readyState() {
    return this[_readyState] || this.UNSENT
  }

  get status() {
    return this[_response] ? this[_response].status : 0
  }

  get statusText() {
    return this[_response] ? this[_response].statusText : ""
  }

  get response() {
    // https://xhr.spec.whatwg.org/#xmlhttprequest-response
    const type = this.responseType
    const state = this[_readyState]
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
    const responseType = this.responseType
    if (responseType !== "" && responseType !== "text") {
      throwReadPropError(
        "responseType",
        `The value is only accessible if the object's 'responseType' is '' ` +
        `or 'text' (was '${responseType}')`
      )
    }

    const state = this[_readyState]
    if (state !== this.LOADING && state !== this.DONE) {
      return ""
    }

    return this[_responseBody] || ""
  }

  get responseXML() {
    const responseType = this.responseType
    if (responseType !== "" && responseType !== "document") {
      throwReadPropError(
        "responseXML",
        `The value is only accessible if the object's 'responseType' is '' ` +
        `or 'document' (was '${responseType}')`)
    }

    const body = this[_responseBody]

    if (this[_readyState] !== this.DONE || !!body) {
      return null
    }

    const finalMimeType = this.getResponseHeader("Content-Type")

    if (finalMimeType !== null &&
      !/(text\/html)|(text\/xml)|(application\/xml)|(\+xml)/i.test(finalMimeType)) {
      return null
    }

    if (responseType === "" && finalMimeType === "text/html") {
      return null
    }

    return parseXML(body)
  }

  get withCredentials() {
    return this[_withCredentials] || false
  }

  set withCredentials(enable) {
    this[_withCredentials] = !!enable
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's open function
   *
   * @param {string} method Method of the request
   * @param {string} url URL of the request
   * @param {boolean} async Wheter to make the request synchronously or not
   * @param {string} username Username to use in the request
   * @param {string} password Password to use in the request
   * @returns {void}
   */
  open(method, url, async = true, username, password) { // eslint-disable-line max-params

    if (method === undefined || url === undefined) {
      throw new TypeError("Not enough arguments to XMLHttpRequest.open")
    }

    if (!async) {
      if (console && console.warn) { console.warn("Synchronous XHR are not supported") }
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
   *
   * @param {string} header Header key
   * @param {string} value Header value
   * @returns {void}
   */
  setRequestHeader(header, value) {
    verifyState(this, "setRequestHeader")

    if (unsafeHeaders[String(header).toLowerCase()] || /^(Sec-|Proxy-)/i.test(header)) {
      console.error(`Refused to set unsafe header '${header}'`)
      return
    }

    if (this[_requestHeaders][header]) {
      this[_requestHeaders][header] += `,${value}`
    } else {
      this[_requestHeaders][header] = value
    }
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's send function
   *
   * @param {object|null} data Request body
   * @returns {void}
   */
  send(data) {
    verifyState(this, "send")
    this[_errorFlag] = false
    this[_sendFlag] = true

    this.dispatchEvent(new ProgressEvent("loadstart", { bubbles: false, cancelable: false }))
    //this.dispatchEvent(new ProgressEvent("progress", { bubbles: false, cancelable: false }))

    const fetchInit = {
      method: this[_method],
      headers: this[_requestHeaders],
      body: data
      // mode: // NOT supported by xhr
      // credentials: // TODO
    }

    if (this[_withCredentials]) {
      fetchInit.credentials = "include"
    }

    const p = Promise.race([
      fetch(this[_url], fetchInit).then(
        (response) => response,
        (reason) => new Promise((resolve, reject) => reject(reason))
      ),
      new Promise((resolve, reject) => {
        if (this.timeout > 0) {
          setTimeout(() => reject(new Error("request timeout")), this.timeout)
        }
      })
    ])

    p.then(
      (response) => {
        // fetch resolved

        this[_response] = response

        // HEADERS_RECEIVED Stage
        const headers = response.headers
        this[_responseHeaders] = {}
        let mimeTypeForced = false

        headers.forEach((value, key) => {
          if (this[_forceMimeType] && key.toLowerCase() === "content-type") {
            this[_responseHeaders][key] = this[_forceMimeType]
            mimeTypeForced = true
          } else {
            this[_responseHeaders][key] = value
          }
        })

        if (this[_forceMimeType] && !mimeTypeForced) {
          this[_responseHeaders]["Content-Type"] = this[_forceMimeType]
        }

        readyStateChange(this, this.HEADERS_RECEIVED)

        // LOADING Stage
        readyStateChange(this, this.LOADING)
        this.dispatchEvent(new ProgressEvent("progress", { bubbles: false, cancelable: false }))
        // TODO: do we need body size?

        return response[
          responseParser[this.responseType] || "text"
        ]()
      },
      (reason) => {
        // fetch rejected || request timeout
        readyStateChange(this, this.DONE)

        if (reason instanceof Error && reason.message === "request timeout") {
          // request timeout
          this.dispatchEvent(new ProgressEvent("timeout", { bubbles: false, cancelable: false }))
        } else if (!this[_aborted]) {
          // fetch rejected
          this.dispatchEvent(new ProgressEvent("error", { bubbles: false, cancelable: false }))
        }

        return new Promise((resolve, reject) => reject(reason))
      }
    ).then((body) => {
      // fetch resolved && body is ready
      if (!this[_aborted] && this[_readyState]) {
        this[_responseBody] = body
        this[_sendFlag] = false
        readyStateChange(this, this.DONE)
        this.dispatchEvent(new ProgressEvent("load", { bubbles: false, cancelable: false }))
      }
    }).then(
      // finally, fire loadend event when the fetch completed (success or failure)
      () => {
        this.dispatchEvent(new ProgressEvent("loadend", { bubbles: false, cancelable: false }))
      },
      () => {
        this.dispatchEvent(new ProgressEvent("loadend", { bubbles: false, cancelable: false }))
      }
      )
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's abort function
   *
   * @returns {void}
   */
  abort() {
    this[_aborted] = true
    this[_errorFlag] = true
    this[_requestHeaders] = {}

    if ((this[_readyState] === this.OPENED && this[_sendFlag]) ||
      this[_readyState] === this.HEADERS_RECEIVED ||
      this[_readyState] === this.LOADING) {
      readyStateChange(this, this.DONE)
      this[_sendFlag] = false
    }

    this[_readyState] = this.UNSENT

    this.dispatchEvent(new ProgressEvent("abort", { bubbles: false, cancelable: false }))
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's getResponseHeader function
   *
   * @param {string} header Header key
   * @returns {string|null} Header value
   */
  getResponseHeader(header) {
    if (this[_readyState] < this.HEADERS_RECEIVED) {
      return null
    }

    if (/^Set-Cookie2?$/i.test(header)) {
      return null
    }

    header = header.toLowerCase()

    for (const h in this[_responseHeaders]) {
      if (h.toLowerCase() === header) {
        return this[_responseHeaders][h]
      }
    }

    return null
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's getAllResponseHeaders function
   *
   * @returns {array} List of response headers
   */
  getAllResponseHeaders() {
    if (this[_readyState] < this.HEADERS_RECEIVED) {
      return ""
    }

    let responseHeaders = this[_responseHeaders]
    if (responseHeaders && responseHeaders.length) {
      // Clone headers and sort them (@see https://xhr.spec.whatwg.org/#dom-xmlhttprequest-getallresponseheaders)
      responseHeaders = responseHeaders.slice().sort()
    }
    let headers = ""

    for (const header in responseHeaders) {
      if (responseHeaders.hasOwnProperty(header) && !/^Set-Cookie2?$/i.test(header)) {
        headers += `${header}: ${responseHeaders[header]}\r\n`
      }
    }

    return headers
  }

  /**
   * Duplicates the behavior of native XMLHttpRequest's overrideMimeType function
   *
   * @param {string} mimeType MimeType that will be used
   * @returns {void}
   */
  overrideMimeType(mimeType) {
    if (typeof mimeType === "string") {
      this[_forceMimeType] = mimeType.toLowerCase()
    }
  }

}

export default {
  install: () => {
    window.XMLHttpRequest = XMLHttpRequestToFetch
  },
  uninstall: () => {
    window.XMLHttpRequest = originalXMLHttpRequest
  },
  XMLHttpRequest: originalXMLHttpRequest
}
