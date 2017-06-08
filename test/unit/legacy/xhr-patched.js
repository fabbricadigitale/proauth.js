describe("Xhr patch", function () {

  it("is ready", function (done) {
    setTimeout(function () {
      expect(proauth.client.ready).toBe(true)
      expect(proauth.client.hasSession()).toBe(false)
      done()
    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 2)

  it("shows a warning when open() is called with async = false", function () {
    console.log = jasmine.createSpy("console.log")

    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", config.oauthServerUrl, true)
    expect(console.log).not.toHaveBeenCalled()

    var xhttp2 = new XMLHttpRequest()
    xhttp2.open("GET", config.oauthServerUrl, false)
    expect(console.log).toHaveBeenCalledWith("Synchronous XHR are not supported")
  })

  it("logs an error if setRequestHeader() is called with unsafe headers", function () {
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", "/webserver")

    var unsafeHeaders = [
      "accept-charset",
      "accept-encoding",
      "connection",
      "content-length",
      "cookie",
      "cookie2",
      "content-transfer-encoding",
      "date",
      "expect",
      "host",
      "keep-alive",
      "referer",
      "te",
      "trailer",
      "transfer-encoding",
      "upgrade",
      "user-agent",
      "via",

      "AccEpT-CharSeT",

      "Sec-",
      "sec-",
      "ProXy-",
      "SEC-foo",
      "Proxy-bar"
    ]

    console.error = jasmine.createSpy("console.error")

    xhttp.setRequestHeader("key", "value")
    expect(console.error).not.toHaveBeenCalled()

    for (var i = 0; i < unsafeHeaders.length; i++) {
      var header = unsafeHeaders[i]

      xhttp.setRequestHeader(header, "value")
      expect(console.error).toHaveBeenCalledTimes(i + 1)
    }

  })

  it("overrides mimetype correctly", function (done) {
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", config.oauthServerUrl + "/return-empty-response", true)
    xhttp.overrideMimeType("text/xml")

    xhttp.send()

    setTimeout(function () {
      expect(xhttp.getResponseHeader("content-type")).toBe("text/xml")
      done()
    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 2)

  it("fires readyStateChange events correctly when request encounters an error", function (done) {

    var currReadyState = 0
    var xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function () {
      if (currReadyState === 0) {
        expect(this.readyState).toBe(1)
        currReadyState = 1
      } else {
        expect(currReadyState).toBe(1)
        expect(this.readyState).toBe(4)
        currReadyState = 4
      }
    }
    spyOn(xhttp, 'onreadystatechange').and.callThrough()

    xhttp.open("GET", "http://invalid-url")
    xhttp.send()

    setTimeout(function () {
      expect(xhttp.onreadystatechange).toHaveBeenCalledTimes(2)
      done()
    }, config.pauseAfterRequests)

  }, config.pauseAfterRequests * 2)

})
