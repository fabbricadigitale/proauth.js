"use strict"

const oauthFactory = function (config) {
  return function (request, response, next) {
    if (request.url === "/oauth") {
      let body = "";
      request.on("data", function (chunk) {
        body += chunk.toString("utf8")
      })
      request.on("end", function () {
        if (body) {
          const requestBodyJson = JSON.parse(body)

          if (requestBodyJson.username === "user" &&
            requestBodyJson.password === "qwerty" &&
            requestBodyJson.grant_type === "password" &&
            requestBodyJson.client_id === "test") {
            return response.end(`{"access_token":"tkn0.1234567890","expires_in":3600,"token_type":"bearer","scope":null,"refresh_token":"rfrsh0.0987654321"}`)
          } else if (requestBodyJson.refresh_token === "rfrsh0.0987654321" &&
            requestBodyJson.grant_type === "refresh_token" &&
            requestBodyJson.client_id === "test") {
            return response.end(`{"access_token":"tkn1.1234567890","expires_in":3600,"token_type":"bearer","scope":null,"refresh_token":"rfrsh1.0987654321"}`)
          }
        }

        response.writeHead(401)
        return response.end(`{"title": "invalid_grant","status":401}`)
      })

    } else {
      return next()
    }
  }
}

const returnAuthorizationHeader = function (config) {
  return function (request, response, next) {
    if (request.url === "/return-authorization-header") {
      return response.end(request.headers.authorization)
    } else {
      return next()
    }
  }
}

const returnEmptyResponse = function (config) {
  return function (request, response, next) {
    if (request.url === "/return-empty-response") {
      return response.end("")
    } else {
      return next()
    }
  }
}

const returnError401 = function (config) {
  return function (request, response, next) {
    if (request.url === "/return-error-401") {
      response.writeHead(401)
      return response.end(`{"title": "invalid_token","status":401}`)
    } else {
      return next()
    }
  }
}


const returnError401Concurrently = function (config) {
  const pendingUa = {}
  const requestMap = {}
  const concurrencyLimit = 3
  return function (request, response, next) {
    if (request.url.startsWith("/return-error-401-with-concurrency-3")) {
      const ua = request.headers["user-agent"]
      let count = 0

      // Only increase pending UA if this is not the 2nd request (i.e. the request with token re-negotiated by proauth)
      if (!requestMap[ua + request.url]) {
        count = pendingUa[ua] = pendingUa[ua] ? (pendingUa[ua] + 1) : 1
      }

      requestMap[ua + request.url] = true

      const intId = setInterval(function () {
        if (count >= concurrencyLimit) {
          count = pendingUa[ua] = 0
          clearInterval(intId)

          response.writeHead(401)
          return response.end(`{"title": "invalid_token","status":401}`)
        } else {
          count = pendingUa[ua]
        }
      }, 500)
    } else {
      return next()
    }
  }
}

const returnInvalidXML = function (config) {
  return function (request, response, next) {
    if (request.url === "/return-invalid-xml") {
      response.setHeader("Content-Type", "text/xml")
      return response.end("invalid_xml")
    } else {
      return next()
    }
  }
}

const returnSomeHeadersFactory = function (config) {
  return function (request, response, next) {
    if (/^\/return-some-headers[?]?\w*/.test(request.url)) {

      // Header purposely not in alphabetical order and upper/lowercased
      response.setHeader("Key-A", "Value-A")
      response.setHeader("Key-B", "Value-B")
      response.setHeader("Key-c", "Value-c")
      response.setHeader("key-e", "value-e")
      response.setHeader("KEY-D", "VALUE-D")

      return response.end("")
    } else {
      return next()
    }
  }
}

const simulateTokenExpiredFactory = function (config) {
  return function (request, response, next) {
    if (request.url === "/simulate-token-expired") {

      if (request.headers.authorization === "bearer tkn0.1234567890") {
        response.writeHead(401)

        return response.end(`{"title": "token_expired","status":401}`)
      } else {
        return response.end(request.headers.authorization)
      }
    } else {
      return next()
    }
  }
}

const sleepFactory = function (config) {
  return function (request, response, next) {
    if (request.url === "/sleep") {
      setTimeout(function () {
        return response.end("")
      }, 1000)
    } else {
      return next()
    }
  }
}

const customLaunchers = {
  sl_chrome_latest_winXP: {
    base: "SauceLabs",
    browserName: "chrome",
    platform: "Windows XP",
    version: "latest"
  },
  sl_chrome_latest_win7: {
    base: "SauceLabs",
    browserName: "chrome",
    platform: "Windows 7",
    version: "latest"
  },
  sl_chrome_latest_win8: {
    base: "SauceLabs",
    browserName: "chrome",
    platform: "Windows 8",
    version: "latest"
  },
  sl_chrome_latest_win10: {
    base: "SauceLabs",
    browserName: "chrome",
    platform: "Windows 10",
    version: "latest"
  },

  sl_chrome_latest_linux: {
    base: "SauceLabs",
    browserName: "chrome",
    platform: "Linux",
    version: "latest"
  },

  sl_chrome_latest_OSX10_8: {
    base: "SauceLabs",
    browserName: "chrome",
    platform: "OS X 10.8",
    version: "latest"
  },
  sl_chrome_latest_macOS10_12: {
    base: "SauceLabs",
    browserName: "chrome",
    platform: "MacOS 10.12",
    version: "latest"
  },

  sl_firefox_47_win7: {
    base: "SauceLabs",
    browserName: "firefox",
    platform: "Windows 7",
    version: "47"
  },
  sl_firefox_52_win10: {
    base: "SauceLabs",
    browserName: "firefox",
    platform: "Windows 10",
    version: "52"
  },
  sl_firefox_latest_winXP: {
    base: "SauceLabs",
    browserName: "firefox",
    platform: "Windows XP",
    version: "latest"
  },
  sl_firefox_latest_win7: {
    base: "SauceLabs",
    browserName: "firefox",
    platform: "Windows 7",
    version: "latest"
  },
  sl_firefox_latest_win8: {
    base: "SauceLabs",
    browserName: "firefox",
    platform: "Windows 8",
    version: "latest"
  },
  sl_firefox_latest_win10: {
    base: "SauceLabs",
    browserName: "firefox",
    platform: "Windows 10",
    version: "latest"
  },

  sl_firefox_latest_linux: {
    base: "SauceLabs",
    browserName: "firefox",
    platform: "Linux",
    version: "latest"
  },

  sl_firefox_latest_OSX10_8: {
    base: "SauceLabs",
    browserName: "firefox",
    platform: "OS X 10.8",
    version: "latest"
  },

  sl_firefox_latest_macOS10_12: {
    base: "SauceLabs",
    browserName: "firefox",
    platform: "MacOS 10.12",
    version: "latest"
  },

  sl_edge_latest_win10: {
    base: "SauceLabs",
    browserName: "microsoftedge",
    platform: "Windows 10",
    version: "latest"
  },

  sl_edge_14_win10: {
    base: "SauceLabs",
    browserName: "microsoftedge",
    platform: "Windows 10",
    version: "14"
  },

  sl_edge_15_win10: {
    base: "SauceLabs",
    browserName: "microsoftedge",
    platform: "Windows 10",
    version: "15"
  },

  sl_ie_11_win7: {
    base: "SauceLabs",
    browserName: "internetexplorer",
    platform: "Windows 7",
    version: "11"
  },

  sl_safari_latest_macos10_12: {
    base: "SauceLabs",
    browserName: "safari",
    platform: "MacOS 10.12",
    version: "latest"
  },

  sl_safari_10_macos10_12: {
    base: "SauceLabs",
    browserName: "safari",
    platform: "MacOS 10.12",
    version: "10"
  },

  sl_safari_9_OSX10_11: {
    base: "SauceLabs",
    browserName: "safari",
    platform: "OS X 10.11",
    version: "9"
  },

  sl_chrome_latest_android6_0: {
    base: "SauceLabs",
    browserName: "chrome",
    deviceName: "Android Emulator",
    platformName: "Android",
    platformVersion: "6.0"
  },
  sl_chrome_latest_android7_0: {
    base: "SauceLabs",
    browserName: "chrome",
    deviceName: "Android GoogleAPI Emulator",
    platformName: "Android",
    platformVersion: "7.0"
  },
  sl_browser_4_4_android4_4: {
    base: "SauceLabs",
    browserName: "Browser",
    deviceName: "Android Emulator",
    platformName: "Android",
    platformVersion: "4.4",
    appiumVersion: "1.6.5"
  },

  sl_safari_10_2_ios_10_2: {
    base: "SauceLabs",
    browserName: "Safari",
    deviceName: "iPhone Simulator",
    platformName: "iOS",
    platformVersion: "10.2",
    appiumVersion: "1.6.5"
  },
  sl_safari_10_3_ios_10_3: {
    base: "SauceLabs",
    browserName: "Safari",
    deviceName: "iPhone Simulator",
    platformName: "iOS",
    platformVersion: "10.3",
    appiumVersion: "1.6.5"
  }

}

const options = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      "spec",
      "progress",
      "coverage"
    ],
    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome", "Firefox"],

    proxies: {
      "/service-worker.js": "/base/lib/service-worker.es2015.js"
    },

    plugins: [
      "karma-*",
      { "middleware:oauth": ["factory", oauthFactory] },
      { "middleware:return-authorization-header": ["factory", returnAuthorizationHeader] },
      { "middleware:return-empty-response": ["factory", returnEmptyResponse] },
      { "middleware:return-error-401": ["factory", returnError401] },
      { "middleware:return-error-401-with-concurrency-3": ["factory", returnError401Concurrently] },
      { "middleware:return-invalid-xml": ["factory", returnInvalidXML] },
      { "middleware:return-some-headers": ["factory", returnSomeHeadersFactory] },
      { "middleware:simulate-token-expired": ["factory", simulateTokenExpiredFactory] },
      { "middleware:sleep": ["factory", sleepFactory] }
    ],

    middleware: [
      "oauth",
      "return-authorization-header",
      "return-empty-response",
      "return-error-401",
      "return-error-401-with-concurrency-3",
      "return-invalid-xml",
      "return-some-headers",
      "simulate-token-expired",
      "sleep"
    ],

    browserNoActivityTimeout: 600000,

    retryLimit: 5,

    customLaunchers,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1

  }

if (process.env.TEST_SAUCELABS) {
  options.reporters.push("saucelabs")
  options.sauceLabs = require("./saucelabs.config.js")
}

module.exports = options
