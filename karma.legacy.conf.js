"use strict"

const sharedOpts = require("./karma-options.js")

const sauceBrowsers =  [
  "sl_chrome_latest_winXP",
  "sl_chrome_latest_win7",
  "sl_chrome_latest_win8",
  "sl_chrome_latest_win10",

  "sl_chrome_latest_OSX10_8",
  "sl_chrome_latest_macOS10_12",

  "sl_firefox_47_win7",
  "sl_firefox_latest_win7",
  "sl_firefox_latest_win8",
  "sl_firefox_latest_win10",

  "sl_firefox_latest_OSX10_8",
  "sl_firefox_latest_macOS10_12",

  "sl_chrome_latest_android6_0",
  "sl_chrome_latest_android7_0"
]

const options = {
  files: [
        "test/fixture/proauth-settings.js",
        "test/fixture/tests-settings.js",
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
