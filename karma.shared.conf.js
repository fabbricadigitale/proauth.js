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
  tb_chrome_latest_winXP: {
    base: "TestingBot",
    browserName: "chrome",
    platform: "XP",
    version: "latest"
  },
  tb_chrome_latest_win7: {
    base: "TestingBot",
    browserName: "chrome",
    platform: "WIN7",
    version: "latest"
  },
  tb_chrome_latest_win8: {
    base: "TestingBot",
    browserName: "chrome",
    platform: "WIN8",
    version: "latest"
  },
  tb_chrome_latest_win10: {
    base: "TestingBot",
    browserName: "chrome",
    platform: "WIN10",
    version: "latest"
  },

  tb_chrome_latest_linux: {
    base: "TestingBot",
    browserName: "chrome",
    platform: "LINUX",
    version: "latest"
  },

  tb_chrome_latest_OSX10_8: {
    base: "TestingBot",
    browserName: "chrome",
    platform: "MAVERICKS",
    version: "latest"
  },
  tb_chrome_latest_macOS10_12: {
    base: "TestingBot",
    browserName: "chrome",
    platform: "SIERRA",
    version: "latest"
  },

  tb_firefox_47_win7: {
    base: "TestingBot",
    browserName: "firefox",
    platform: "WIN7",
    version: "47"
  },
  tb_firefox_51_win7: {
    base: "TestingBot",
    browserName: "firefox",
    platform: "WIN7",
    version: "51"
  },
  tb_firefox_latest_winXP: {
    base: "TestingBot",
    browserName: "firefox",
    platform: "XP",
    version: "latest"
  },
  tb_firefox_latest_win7: {
    base: "TestingBot",
    browserName: "firefox",
    platform: "WIN7",
    version: "latest"
  },
  tb_firefox_latest_win8: {
    base: "TestingBot",
    browserName: "firefox",
    platform: "WIN8",
    version: "latest"
  },
  tb_firefox_latest_win10: {
    base: "TestingBot",
    browserName: "firefox",
    platform: "WIN10",
    version: "latest"
  },

  tb_firefox_latest_linux: {
    base: "TestingBot",
    browserName: "firefox",
    platform: "LINUX",
    version: "latest"
  },

  tb_firefox_latest_OSX10_8: {
    base: "TestingBot",
    browserName: "firefox",
    platform: "MAVERICKS",
    version: "latest"
  },
  tb_firefox_latest_macOS10_12: {
    base: "TestingBot",
    browserName: "firefox",
    platform: "SIERRA",
    version: "latest"
  },

  tb_edge_latest_win10: {
    base: "TestingBot",
    browserName: "microsoftedge",
    platform: "WIN10",
    version: "latest"
  },

  tb_safari_latest_macos10_12: {
    base: "TestingBot",
    browserName: "safari",
    platform: "SIERRA",
    version: "latest"
  }
}

module.exports = function (config) {
  config.set({

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
    reporters: ["progress", "testingbot"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],

    proxies: {
      "/service-worker.js": "/base/lib/service-worker.es2015.js"
    },

    plugins: [
      "karma-*",
      { "middleware:oauth": ["factory", oauthFactory] },
      { "middleware:return-authorization-header": ["factory", returnAuthorizationHeader] },
      { "middleware:return-empty-response": ["factory", returnEmptyResponse] },
      { "middleware:return-error-401": ["factory", returnError401] },
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
      "return-invalid-xml",
      "return-some-headers",
      "simulate-token-expired",
      "sleep"
    ],

    testingbot: {
      apiKey: "7558872fa56a947a238e97f43cc67687",
      apiSecret: "742e6eb85bdb17948b0146650362c026",
      testName: "Proauth.js Tests"
    },

    browserNoActivityTimeout: 600000,

    customLaunchers,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
