describe("Proauth client", function () {

  afterEach(function () {
    proauth.client.sessionContainer.clear()
  })

  it("whenReady is a promise", function () {
    expect(proauth.client.whenReady instanceof Promise).toBe(true)
  })

  it("is ready", function (done) {
    proauth.client.whenReady.then(() => {
      expect(proauth.client.ready).toBe(true)
      expect(proauth.client.hasSession()).toBe(false)
      done()
    })
  })

  it("has correct default values", function () {
    var client = proauth.client
    var settings = client.settings
    var sessionContainer = client.sessionContainer
    expect(settings.swSrc).toBe("/service-worker.js")
    expect(settings.swOptions).toEqual({})
    expect(settings.oauthUrl).toBe("http://localhost:9876/oauth")
    expect(settings.oauthClientId).toBe("test")
    expect(settings.sessionStorage).toBe("localStorage")
    expect(settings.managedUrls).toEqual(
      [
        window.location.protocol + "//" + window.location.host + "/"
      ]
    )
    expect(sessionContainer.namespace).toBe(settings.namespace)
    expect(client.sessionContainer.content).toBeNull()
    expect(client.serviceWorker).not.toBeNull()
  })

  it("set legacyMode correctly", function () {
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
    var handler = function () {
      client.serviceWorker.removeEventListener("message", handler)

      expect(client.sessionContainer.content).toEqual(sessionData)
      expect(client.hasSession()).toBe(true)

      var sessionData2 = { "someKey2": "someValue2" }
      var handler2 = function () {
        client.serviceWorker.removeEventListener("message", handler2)
        expect(client.sessionContainer.content).toEqual(sessionData2)
        expect(client.hasSession()).toBe(true)
        proauth.client.sessionContainer.clear()
        expect(client.hasSession()).toBe(false)
        done()
      }
      // Override old session
      client.serviceWorker.addEventListener("message", handler2)
      expect(client.setSession(sessionData2) instanceof Promise).toBe(true)
    }

    client.serviceWorker.addEventListener("message", handler)
    expect(client.setSession(sessionData) instanceof Promise).toBe(true)

  })

  it("executes login correctly", function (done) {
    var client = proauth.client

    expect(client.hasSession()).toBe(false)

    var handler = function () {
      client.serviceWorker.removeEventListener("message", handler)
      expect(client.hasSession()).toBe(true)
      done()
    }
    client.serviceWorker.addEventListener("message", handler)

    client.login("user", "qwerty")
  })

  it("fails login if credentials are wrong", function (done) {
    var client = proauth.client

    expect(client.hasSession()).toBe(false)

    var handler = function () {
      client.serviceWorker.removeEventListener("message", handler)
      expect(client.hasSession()).toBe(false)
      done()
    }
    client.serviceWorker.addEventListener("message", handler)
    client.login("user_wrong", "qwerty_wrong")
  })

  it("sends headers in ajax after login", function (done) {
    var client = proauth.client

    client.login("user", "qwerty").then(function () {
      var xhttp = new XMLHttpRequest()
      xhttp.open("GET", "/return-authorization-header")
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          var response = this.responseText
          // Check session was not cleared
          expect(client.hasSession()).toBe(true)
          expect(response).toBe("bearer tkn0.1234567890")
          done()
        }
      }
      xhttp.send()
    })
  })

  it("sends headers in fetch after login", function (done) {
    var client = proauth.client

    client.login("user", "qwerty").then(function () {
      fetch("/return-authorization-header").then(function (data) {
        data.text().then(function (text) {
          // Check session was not cleared
          expect(client.hasSession()).toBe(true)
          expect(text).toBe("bearer tkn0.1234567890")
          done()
        })
      })
    })
  })

  it("re-negotiates token with ajax if it is expired", function (done) {
    var client = proauth.client

    client.login("user", "qwerty").then(function () {
      var xhttp = new XMLHttpRequest()
      xhttp.open("GET", "/simulate-token-expired")
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          expect(this.status).toBe(200)
          var response = this.responseText
          // Check session was not cleared
          expect(client.hasSession()).toBe(true)
          expect(response).toBe("bearer tkn1.1234567890")
          done()
        }
      }
      xhttp.send()
    })
  })

  it("re-negotiates token with fetch if it is expired", function (done) {
    var client = proauth.client

    client.login("user", "qwerty").then(function () {
      fetch("/simulate-token-expired").then(function (data) {
        expect(data.ok).toBe(true)
        data.text().then(function (text) {
          // Check session was not cleared
          expect(client.hasSession()).toBe(true)
          expect(text).toBe("bearer tkn1.1234567890")
          done()
        })
      })
    })
  })

  it("doesn't go in an infinite loop if 401 is always returned with ajax", function (done) {
    var client = proauth.client

    client.login("user", "qwerty").then(function () {
      var xhttp = new XMLHttpRequest()
      xhttp.open("GET", "/return-error-401")
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          // Check session was not cleared
          expect(client.hasSession()).toBe(true)
          expect(this.status).toBe(401)
          done()
        }
      }
      xhttp.send()
    })
  })

  it("doesn't go in an infinite loop if 401 is always returned with fetch", function (done) {
    var client = proauth.client

    client.login("user", "qwerty").then(function () {
      fetch("/return-error-401").then(function (data) {
        // Check session was not cleared
        expect(client.hasSession()).toBe(true)
        expect(data.status).toBe(401)
        done()
      })
    })
  })

  it("doesn't refresh tokens concurrently", function (done) {

    var client = proauth.client

      var count = 0
      var handler = function(event) {
        if (event.data.command === "session") {
          count++
        }
      }
      client.serviceWorker.addEventListener("message", handler)

      Promise.all([
        fetch("/return-error-401"),
        fetch("/return-error-401"),
        fetch("/return-error-401")
      ]).then(function() {
        client.serviceWorker.removeEventListener("message", handler)

        expect(client.hasSession()).toBe(false)
        expect(count).toBe(1)
        done()
      })
  })


})
