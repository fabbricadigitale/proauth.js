"use strict"

const sharedConf = require("./karma.shared.conf.js")

const launchers = [
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

module.exports = function (config) {
  sharedConf(config)

  config.set({

    files: [
      "test/fixture/proauth-settings.js",
      "test/fixture/tests-settings.js",
      "lib/legacy.js",
      "test/**/*.js"
    ],

    preprocessors: {
      "lib/legacy.js": "coverage"
    },

    reporters: [
      "spec",
      "coverage"
    ],

    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "json", subdir: ".", file: "legacy.coverage.json" },
        { type: "lcovonly", subdir: ".", file: "legacy.lcov.info" },
        { type: "text", subdir: ".", file: "legacy.text.txt" },
        { type: "text-summary", subdir: ".", file: "legacy.text.summary.txt" },
        { type: "html", subdir: "html/legacy" }
      ]
    },

    exclude: [
    ],

    browsers: launchers

  })
}
