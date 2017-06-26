"use strict"

const sharedConf = require("./karma.shared.conf.js")

const launchers = [
  "tb_chrome_latest_winXP",
  "tb_chrome_latest_win7",
  "tb_chrome_latest_win8",
  "tb_chrome_latest_win10",
  "tb_chrome_latest_OSX10_8",
  "tb_chrome_latest_macOS10_12",
  "tb_firefox_51_win7",
  "tb_firefox_latest_win7",
  "tb_firefox_latest_win8",
  "tb_firefox_latest_win10",
  "tb_firefox_latest_macOS10_12"
]


module.exports = function (config) {
  sharedConf(config)

  config.set({

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

    reporters: [
      "spec",
      "coverage"
    ],

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
    ],

    browsers: launchers

  })
}
