"use strict"

const sharedOpts = require("./karma-options.js")

const sauceBrowsers =  [
  "sl_chrome_latest_winXP",
  "sl_chrome_latest_win7",
  "sl_chrome_latest_win8",
  "sl_chrome_latest_win10",

  "sl_chrome_latest_OSX10_8",
  "sl_chrome_latest_macOS10_12",

  "sl_firefox_51_win7",
  "sl_firefox_latest_win7",
  "sl_firefox_latest_win8",
  "sl_firefox_latest_win10",

  "sl_firefox_latest_macOS10_12",

  "sl_chrome_latest_android6_0",
  "sl_chrome_latest_android7_0"
]

const options = {

    files: [
      { pattern: "lib/service-worker.es2015.js", included: false }, // service-worker.es2015.js can be downloaded under /base/lib/, but will not be loaded at startup
      "test/fixture/proauth-settings.js",
      "test/fixture/tests-settings.js",
      "lib/default.es2015.js",
      "test/**/*.js"
    ],

    preprocessors: {
      "lib/default.es2015.js": "coverage"
    },

    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "json", subdir: ".", file: "default.coverage.json" },
        { type: "lcovonly", subdir: ".", file: "default.lcov.info" },
        { type: "text", subdir: ".", file: "default.text.txt" },
        { type: "text-summary", subdir: ".", file: "default.text.summary.txt" },
        { type: "html", subdir: "html/default" }
      ]
    },

    exclude: [
      "test/unit/legacy/xhr-patched.js"
    ]
}


module.exports = function (config) {

  config.set(sharedOpts)

  config.set(options)

  if (process.env.TEST_SAUCELABS) {
    config.set({
      sauceLabs: Object.assign({}, sharedOpts.sauceLabs, { testName: "proauth.js (default)" }),
      browsers: sauceBrowsers
    })
  }
}
