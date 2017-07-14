describe("Xhr patch", function () {

  it("has correct values when unsent", function () {
    var xhttp = new XMLHttpRequest()

    expect(xhttp.onabort).toBeNull()
    expect(xhttp.onerror).toBeNull()
    expect(xhttp.onload).toBeNull()
    expect(xhttp.onloadend).toBeNull()
    expect(xhttp.onloadstart).toBeNull()
    expect(xhttp.onprogress).toBeNull()
    expect(xhttp.onreadystatechange).toBeNull()
    expect(xhttp.ontimeout).toBeNull()

    expect(xhttp.readyState).toBe(0)

    expect(xhttp.response).toBe("")
    expect(xhttp.responseText).toBe("")
    expect(xhttp.responseType).toBe("")
    expect(xhttp.responseURL).toBe("")
    expect(xhttp.responseXML).toBeNull()

    expect(xhttp.status).toBe(0)
    expect(xhttp.statusText).toBe("")

    expect(xhttp.timeout).toBe(0)

    expect(xhttp.upload instanceof XMLHttpRequestUpload).toBe(true)

    expect(xhttp.withCredentials).toBe(false)
  })

  it("changes readyState correctly when request finishes without problems", function (done) {
    var xhttp = new XMLHttpRequest()

    expect(xhttp.readyState).toBe(0) // UNSENT

    xhttp.open("GET", "/")
    expect(xhttp.readyState).toBe(1) // OPENED

    xhttp.onload = function () {
      expect(xhttp.readyState).toBe(4) // DONE
      done()
    }

    xhttp.send()

})

  it("changes readyState correctly when request encounters an error", function (done) {
    var xhttp = new XMLHttpRequest()

    expect(xhttp.readyState).toBe(0) // UNSENT

    xhttp.open("GET", "http://invalid-url" + Math.random())
    expect(xhttp.readyState).toBe(1) // OPENED

    xhttp.onloadend = function () {
      expect(xhttp.readyState).toBe(4) // DONE
      done()
    }

    xhttp.send()

})


  it("fires readyStateChange events correctly when request finishes without problems",
    function (done) {

      var currReadyState = 0
      var xhttp = new XMLHttpRequest()

      xhttp.onreadystatechange = function () {
        expect(this.readyState).toBe(++currReadyState)
      }
      spyOn(xhttp, "onreadystatechange").and.callThrough()

      xhttp.open("GET", "/oauth")

      xhttp.onload = function () {
        expect(xhttp.onreadystatechange).toHaveBeenCalledTimes(4)
        done()
      }

      xhttp.send()

  })

  it("fires load events in correct order when request finishes without problems", function (done) {

    var evtIndex = 0
    var xhttp = new XMLHttpRequest()

    xhttp.onerror = function () {
      fail()
    }

    xhttp.onloadstart = function () {
      expect(evtIndex).toBe(0)
      evtIndex++
    }
    spyOn(xhttp, "onloadstart").and.callThrough()

    xhttp.onprogress = function () {
      expect(evtIndex).toBe(1)
      evtIndex++
    }
    spyOn(xhttp, "onprogress").and.callThrough()

    xhttp.onload = function () {
      expect(evtIndex).toBe(2)
      evtIndex++
    }
    spyOn(xhttp, "onload").and.callThrough()

    xhttp.onloadend = function () {
      expect(evtIndex).toBe(3)
      expect(xhttp.onloadstart).toHaveBeenCalledTimes(1)
      expect(xhttp.onload).toHaveBeenCalledTimes(1)
      expect(xhttp.onprogress).toHaveBeenCalledTimes(1)
      expect(xhttp.onloadend).toHaveBeenCalledTimes(1)
      done()
    }
    spyOn(xhttp, "onloadend").and.callThrough()

    xhttp.open("GET", "/oauth")
    xhttp.send()

})

  it("fires load events in correct order when request encounters an error", function (done) {

    var evtIndex = 0
    var xhttp = new XMLHttpRequest()

    xhttp.onerror = function () {
      expect(evtIndex).toBe(1)
      evtIndex++
    }
    spyOn(xhttp, "onerror").and.callThrough()

    xhttp.onloadstart = function () {
      expect(evtIndex).toBe(0)
      evtIndex++
    }
    spyOn(xhttp, "onloadstart").and.callThrough()

    xhttp.onload = function () {
      fail()
    }

    xhttp.onloadend = function () {
      expect(evtIndex).toBe(2)
      expect(xhttp.onloadstart).toHaveBeenCalledTimes(1)
      expect(xhttp.onerror).toHaveBeenCalledTimes(1)
      expect(xhttp.onloadend).toHaveBeenCalledTimes(1)
      done()
    }
    spyOn(xhttp, "onloadend").and.callThrough()

    xhttp.open("GET", "http://invalid-url" + Math.random())
    xhttp.send()

})

  it("fires events correctly when aborted", function (done) {

    var xhttp = new XMLHttpRequest()

    xhttp.onerror = function () {
      fail()
    }

    xhttp.onload = function () {
      fail()
    }

    xhttp.ontimeout = function () {
      fail()
    }

    xhttp.onloadend = function () {
      expect(xhttp.onloadstart).toHaveBeenCalledTimes(1)
      expect(xhttp.onabort).toHaveBeenCalledTimes(1)
      expect(xhttp.onloadend).toHaveBeenCalledTimes(1)
      done()
    }

    spyOn(xhttp, "onloadstart").and.callThrough()
    spyOn(xhttp, "onabort").and.callThrough()
    spyOn(xhttp, "onloadend").and.callThrough()

    xhttp.open("GET", "/oauth")
    xhttp.send()
    xhttp.abort()

})

  it("goes in timeout correctly", function (done) {

    var xhttp = new XMLHttpRequest()

    xhttp.onerror = function () {
      fail()
    }

    xhttp.onload = function () {
      fail()
    }

    xhttp.onabort = function () {
      fail()
    }

    xhttp.onloadend = function () {
      expect(xhttp.onloadstart).toHaveBeenCalledTimes(1)
      expect(xhttp.ontimeout).toHaveBeenCalledTimes(1)
      expect(xhttp.onloadend).toHaveBeenCalledTimes(1)
      done()
    }

    spyOn(xhttp, "onloadstart").and.callThrough()
    spyOn(xhttp, "ontimeout").and.callThrough()
    spyOn(xhttp, "onloadend").and.callThrough()

    xhttp.timeout = 1
    xhttp.open("GET", "/sleep")
    xhttp.send()

})

  it("set withCredentials always as a boolean", function () {
    var xhttp = new XMLHttpRequest()

    expect(xhttp.withCredentials).toBe(false)

    xhttp.withCredentials = false
    expect(xhttp.withCredentials).toBe(false)

    xhttp.withCredentials = true
    expect(xhttp.withCredentials).toBe(true)

    xhttp.withCredentials = null
    expect(xhttp.withCredentials).toBe(false)

    xhttp.withCredentials = undefined
    expect(xhttp.withCredentials).toBe(false)

    xhttp.withCredentials = 0
    expect(xhttp.withCredentials).toBe(false)

    xhttp.withCredentials = 1
    expect(xhttp.withCredentials).toBe(true)

    xhttp.withCredentials = ""
    expect(xhttp.withCredentials).toBe(false)

    xhttp.withCredentials = "0"
    expect(xhttp.withCredentials).toBe(true)
  })

  it("does not allow to call open without mandatory args", function () {
    var xhttp = new XMLHttpRequest()

    expect(function () {
      xhttp.open()
    }).toThrowError(TypeError)

  })

  it("changes readyState when open() is called", function () {
    var xhttp = new XMLHttpRequest()

    expect(xhttp.readyState).toBe(0)

    xhttp.open("GET", "/oauth")
    expect(xhttp.readyState).toBe(1)
  })

  it("throws an error if setRequestHeader() is called when not opened", function (done) {
    var xhttp = new XMLHttpRequest()

    expect(function () {
      xhttp.setRequestHeader("key", "value")
    }).toThrow()

    xhttp.open("GET", "/")
    expect(function () {
      xhttp.setRequestHeader("key", "value")
    }).not.toThrow()

    xhttp.onloadend = function () {
      expect(function () {
        xhttp.setRequestHeader("key", "value")
      }).toThrow()
      done()
    }

    xhttp.send()
})

  it("returns null in responseXML if document is empty", function (done) {
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", "/return-empty-response", true)

    xhttp.onload = function () {
      expect(xhttp.responseXML).toBeNull()
      done()
    }

    xhttp.send()
})

  it("returns null in responseXML if document is invalid", function (done) {
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", "/return-invalid-xml", true)

    xhttp.onload = function () {
      expect(xhttp.responseXML).toBeNull()
      done()
    }

    xhttp.send()
})

  it("returns headers in case unsensitive way", function (done) {
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", "/return-some-headers", true)

    xhttp.onload = function () {
      expect(xhttp.getResponseHeader("key-a")).toBe("Value-A")
      expect(xhttp.getResponseHeader("Key-a")).toBe("Value-A")
      expect(xhttp.getResponseHeader("Key-A")).toBe("Value-A")
      expect(xhttp.getResponseHeader("KEY-A")).toBe("Value-A")

      expect(xhttp.getResponseHeader("key-d")).toBe("VALUE-D")
      expect(xhttp.getResponseHeader("Key-d")).toBe("VALUE-D")
      expect(xhttp.getResponseHeader("Key-D")).toBe("VALUE-D")
      expect(xhttp.getResponseHeader("KEY-D")).toBe("VALUE-D")
      done()
    }

    xhttp.send()
})

  it("returns response url correctly", function (done) {
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", "/return-some-headers?query&key=value#fragment", true)
    expect(xhttp.responseURL).toBe("")

    xhttp.onload = function () {
      expect(xhttp.responseURL).toBe(
        window.location.protocol +
        "//" +
        window.location.host + "/return-some-headers?query&key=value"
      )
      done()
    }

    xhttp.send()
})

})
