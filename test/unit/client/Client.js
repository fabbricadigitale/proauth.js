describe("Proauth client", function () {

  afterEach(function () {
    proauth.client.sessionContainer.clear()
  })

  it("is ready", function (done) {
    setTimeout(function () {
      expect(proauth.client.ready).toBe(true)
      expect(proauth.client.hasSession()).toBe(false)
      done()
    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 2)

  it("has correct default values", function () {
    var client = proauth.client
    var settings = client.settings
    var sessionContainer = client.sessionContainer
    expect(settings.swSrc).toBe("/service-worker.js")
    expect(settings.swOptions).toEqual({})
    expect(settings.oauthUrl).toBe(config.oauthServerUrl + "/oauth")
    expect(settings.oauthClientId).toBe("test")
    expect(settings.sessionStorage).toBe("localStorage")
    expect(settings.managedUrls).toEqual([window.location.protocol + "//" + window.location.host + "/", config.oauthServerUrl + "/"])
    expect(sessionContainer.namespace).toBe(settings.namespace)
    expect(client.sessionContainer.content).toBeNull()
    expect(client.serviceWorker).not.toBeNull()
  })

  it("set legacyMode correctly", function() {
    var client = proauth.client
    var legacy = proauth.legacy
    expect(client.legacyMode).toBe(!!legacy)
    if (client.legacyMode) {
      expect(client.serviceWorker).toEqual(legacy.serviceWorker)
    }
  })

  it("throws error if trying to set legacyMode", function () {
    var client = proauth.client

    expect(function () {
      client.legacyMode = true
    }).toThrowError("legacyMode is a read-only property")

    expect(function () {
      client.legacyMode = false
    }).toThrowError("legacyMode is a read-only property")

    expect(function () {
      client.legacyMode = undefined
    }).toThrowError("legacyMode is a read-only property")
  })

  it("set sessions correctly", function (done) {
    var client = proauth.client

    expect(client.hasSession()).toBe(false)

    var sessionData = { "someKey": "someValue" }
    client.setSession(sessionData)

    setTimeout(function () {
      expect(client.sessionContainer.content).toEqual(sessionData)
      expect(client.hasSession()).toBe(true)

      var sessionData2 = { "someKey2": "someValue2" }
      // Override old session
      client.setSession(sessionData2)

      setTimeout(function () {
        expect(client.sessionContainer.content).toEqual(sessionData2)
        expect(client.hasSession()).toBe(true)
        proauth.client.sessionContainer.clear()
        expect(client.hasSession()).toBe(false)
        done()
      }, config.pauseAfterRequests)

    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 4)

  it("set sessions correctly", function (done) {
    var client = proauth.client

    expect(client.hasSession()).toBe(false)

    var sessionData = { "someKey": "someValue" }
    client.setSession(sessionData)

    setTimeout(function () {
      expect(client.sessionContainer.content).toEqual(sessionData)
      expect(client.hasSession()).toBe(true)

      var sessionData2 = { "someKey2": "someValue2" }
      // Override old session
      client.setSession(sessionData2)

      setTimeout(function () {
        expect(client.sessionContainer.content).toEqual(sessionData2)
        expect(client.hasSession()).toBe(true)
        proauth.client.sessionContainer.clear()
        expect(client.hasSession()).toBe(false)
        done()
      }, config.pauseAfterRequests)

    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 4)

  it("executes login correctly", function (done) {
    var client = proauth.client

    expect(client.hasSession()).toBe(false)

    client.login("user", "qwerty")

    setTimeout(function () {
      expect(client.hasSession()).toBe(true)
      done()
    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 2)

  it("fails login if credentials are wrong", function (done) {
    var client = proauth.client

    expect(client.hasSession()).toBe(false)

    client.login("user_wrong", "qwerty_wrong")

    setTimeout(function () {
      expect(client.hasSession()).toBe(false)
      done()
    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 2)

  it("sends headers in ajax after login", function (done) {
    var client = proauth.client

    client.login("user", "qwerty")

    setTimeout(function () {
      var xhttp = new XMLHttpRequest()
      var response
      xhttp.open("GET", config.oauthServerUrl + "/return-authorization-header")
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          response = this.responseText
        }
      }
      xhttp.send()

      setTimeout(function () {
        // Check session was not cleared
        expect(client.hasSession()).toBe(true)
        expect(response).toBe("bearer tkn0.1234567890")
        done()
      }, config.pauseAfterRequests)
    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 4)

  it("sends headers in fetch after login", function (done) {
    var client = proauth.client

    client.login("user", "qwerty")

    setTimeout(function () {
      var response
      fetch(config.oauthServerUrl + "/return-authorization-header").then(function (data) {
        data.text().then(function (text) {
          response = text
        })
      })

      setTimeout(function () {
        // Check session was not cleared
        expect(client.hasSession()).toBe(true)
        expect(response).toBe("bearer tkn0.1234567890")
        done()
      }, config.pauseAfterRequests)
    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 4)

  it("re-negotiates token with ajax if it is expired", function (done) {
    var client = proauth.client

    client.login("user", "qwerty")

    setTimeout(function () {
      var xhttp = new XMLHttpRequest()
      var response
      xhttp.open("GET", config.oauthServerUrl + "/simulate-token-expired")
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          expect(this.status).toBe(200)
          response = this.responseText
        }
      }
      xhttp.send()

      setTimeout(function () {
        // Check session was not cleared
        expect(client.hasSession()).toBe(true)
        expect(response).toBe("bearer tkn1.1234567890")
        done()
      }, config.pauseAfterRequests)
    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 4)

  it("re-negotiates token with fetch if it is expired", function (done) {
    var client = proauth.client

    client.login("user", "qwerty")

    setTimeout(function () {
      var response
      fetch(config.oauthServerUrl + "/simulate-token-expired").then(function (data) {
        expect(data.ok).toBe(true)
        data.text().then(function (text) {
          response = text
        })
      })

      setTimeout(function () {
        // Check session was not cleared
        expect(client.hasSession()).toBe(true)
        expect(response).toBe("bearer tkn1.1234567890")
        done()
      }, config.pauseAfterRequests)
    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 4)

  it("doesn't go in an infinite loop if 401 is always returned with ajax", function (done) {
    var client = proauth.client

    client.login("user", "qwerty")

    setTimeout(function () {
      var xhttp = new XMLHttpRequest()
      var status
      xhttp.open("GET", config.oauthServerUrl + "/return-401")
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          status = this.status
        }
      }
      xhttp.send()

      setTimeout(function () {
        // Check session was not cleared
        expect(client.hasSession()).toBe(true)
        expect(status).toBe(401)
        done()
      }, config.pauseAfterRequests)
    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 4)

  it("doesn't go in an infinite loop if 401 is always returned with fetch", function (done) {
    var client = proauth.client

    client.login("user", "qwerty")

    setTimeout(function () {
      var status
      fetch(config.oauthServerUrl + "/return-401").then(function (data) {
        status = data.status
      })

      setTimeout(function () {
        // Check session was not cleared
        expect(client.hasSession()).toBe(true)
        expect(status).toBe(401)
        done()
      }, config.pauseAfterRequests)
    }, config.pauseAfterRequests)
  }, config.pauseAfterRequests * 4)

})
