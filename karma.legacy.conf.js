"use strict"

const sharedConf = require("./karma.shared.conf.js");

module.exports = function (config) {
  sharedConf(config)

  config.set({

    files: [
      "test/fixture/proauth-settings.js",
      "test/fixture/tests-settings.js",
      "lib/legacy.es2015.js",
      "test/**/*.js"
    ],

    preprocessors: {
     "lib/legacy.es2015.js": "coverage"
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

    browsers: ["Chrome", "Firefox"]

  })
}
