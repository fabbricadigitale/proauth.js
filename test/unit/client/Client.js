describe("Proauth client", function () {

  afterEach(function () {
    proauth.client.sessionContainer.clear()
  })

  it("is ready", function (done) {
    setTimeout(function () {
      expect(proauth.client.ready).toBe(true)
      expect(proauth.client.hasSession()).toBe(false)
      done()
    }, 1000)
  }, 1100)

  it("has correct default values", function () {
    var client = proauth.client
    var settings = client.settings
    var sessionContainer = client.sessionContainer
    expect(settings.serviceSrc).toBe("lib/service.js")
    expect(settings.oauthUrl).toBe("http://127.0.0.1:8060/oauth")
    expect(settings.oauthClientId).toBe("test")
    expect(settings.sessionStorage).toBe("localStorage")
    // expect(settings.namespace).toBe("")
    expect(settings.managedUrls).toEqual([window.location.protocol + "//" + window.location.host + "/", "http://127.0.0.1:8060/"])
    expect(sessionContainer.namespace).toBe(settings.namespace)
    expect(client.sessionContainer.content).toBeNull()
    expect(client.serviceWorker).not.toBeNull()
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
      }, 1000)

    }, 1000)
  }, 2200)

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
      }, 1000)

    }, 1000)
  }, 4000)

  it("log in correctly", function (done) {
    var client = proauth.client

    expect(client.hasSession()).toBe(false)

    client.login("user", "qwerty")

    setTimeout(function () {
      expect(client.hasSession()).toBe(true)
      done()
    }, 1000)
  }, 2000)

  it("sends headers in ajax after login", function (done) {
    var client = proauth.client

    client.login("user", "qwerty")

    setTimeout(function () {
      var xhttp = new XMLHttpRequest()
      var response
      xhttp.open("GET", "http://127.0.0.1:8060/return-authorization-header", true)
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          response = this.responseText
        }
      };
      xhttp.send()

      setTimeout(function () {
        // Check session was not cleared
        expect(client.hasSession()).toBe(true)
        expect(response).toBe("bearer tkn.1234567890")
        done()
      }, 1000)
    }, 1000)
  }, 4000)

  it("sends headers in fetch after login", function (done) {
    var client = proauth.client

    client.login("user", "qwerty")

    setTimeout(function () {
      var xhttp = new XMLHttpRequest()
      fetch("http://127.0.0.1:8060/return-authorization-header").then(function (data) {
        data.text().then(function (text) {
          response = text
        })
      })

      setTimeout(function () {
        // Check session was not cleared
        expect(client.hasSession()).toBe(true)
        expect(response).toBe("bearer tkn.1234567890")
        done()
      }, 1000)
    }, 1000)
  }, 4000)

  it("re-negotiates token if it is expired")

})
