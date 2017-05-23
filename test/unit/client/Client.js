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
    expect(settings.oauthUrl).toBe(window.location.protocol + "//" + window.location.host + "/oauth")
    expect(settings.oauthClientId).toBe("proauth")
    expect(settings.sessionStorage).toBe("localStorage")
    // expect(settings.namespace).toBe("")
    expect(settings.managedUrls).toEqual([window.location.protocol + "//" + window.location.host + "/"])
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
  }, 2200)

  xit("log in correctly", function (done) {
    var client = proauth.client

    expect(client.hasSession()).toBe(false)

    client.login("username", "password")

    setTimeout(function () {
      expect(client.hasSession()).toBe(true)
      done()
    }, 1000)
  }, 1100)

})
