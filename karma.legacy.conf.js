"use strict"

const sharedOpts = require("./karma-options.js")

/**
 * This should (approximately) match with the browser matrix used to build the legacy library.
 */
const sauceBrowsers =  [
  "sl_safari_10_macos10_12",

  "sl_edge_14_win10",
  "sl_edge_15_win10",

  "sl_ie_11_win7",

  "sl_firefox_47_win7",
  "sl_firefox_52_win10",
  "sl_firefox_latest_win10",
  "sl_firefox_latest_macOS10_12",
  "sl_firefox_latest_linux",

  "sl_safari_10_2_ios_10_2",
  "sl_safari_10_3_ios_10_3",

  "sl_browser_4_4_android4_4"
]

const options = {
  files: [
        "test/fixture/proauth-settings.js",
        "test/fixture/tests-settings.js",
        "node_modules/whatwg-fetch/fetch.js",
        "lib/legacy.js",
        "test/**/*.js"
  ],

  preprocessors: {
    "lib/legacy.js": "coverage"
  },

  coverageReporter: {
    dir: "coverage",
    reporters: [
      { type: "json", subdir: ".", file: "legacy.coverage.json" },
      { type: "lcovonly", subdir: ".", file: "legacy.lcov.info" },
      { type: "text", subdir: ".", file: "legacy.text.txt" },
      { type: "text-summary", subdir: ".", file: "legacy.text.summary.txt" },
      { type: "html", subdir: "html/legacy" }
    ]
  }
}

module.exports = function (config) {
  config.set(sharedOpts)

  config.set(options)

  if (process.env.TEST_SAUCELABS) {
    config.set({
      sauceLabs: Object.assign({}, sharedOpts.sauceLabs, { testName: "proauth.js (legacy)" }),
      browsers: sauceBrowsers
    })
  }
}
