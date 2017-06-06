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

})
