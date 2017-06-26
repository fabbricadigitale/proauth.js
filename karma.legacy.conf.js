"use strict"

const sharedConf = require("./karma.shared.conf.js")

const launchers = [
  "tb_chrome_latest_winXP",
  "tb_chrome_latest_win7",
  "tb_chrome_latest_win8",
  "tb_chrome_latest_win10",
  "tb_firefox_47_win7",
  "tb_chrome_latest_OSX10_8",
  "tb_chrome_latest_macOS10_12",
  "tb_firefox_latest_win7",
  "tb_firefox_latest_win8",
  "tb_firefox_latest_win10",
  "tb_firefox_latest_OSX10_8",
  "tb_firefox_latest_macOS10_12"
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
