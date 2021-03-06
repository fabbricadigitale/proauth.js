describe("Session container", function () {

  afterEach(function () {
    proauth.client.sessionContainer.clear()
  })

  it("handles sessions correctly on storage", function () {
    var client = proauth.client

    expect(client.sessionContainer.content).toBeNull()

    var sessionData = { "someKey": "someValue" }
    client.sessionContainer.content = sessionData
    expect(client.sessionContainer.content).toEqual(sessionData)

    var sessionData2 = { "someKey2": "someValue2" }
    client.sessionContainer.content = sessionData2
    expect(client.sessionContainer.content).toEqual(sessionData2)
  })

})
