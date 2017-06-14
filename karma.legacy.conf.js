const sharedConf = require("./karma.shared.conf.js");

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
      "!lib/*.es2015.js": "coverage",
      "lib/*.js": "coverage"
    },

    reporters: [
      "spec",
      "coverage"
    ],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'lcovonly', subdir: '.', file: 'legacy.lcov.info' },
        { type: 'text', subdir: '.', file: 'legacy.text.txt' },  
        { type: 'text-summary', subdir: '.', file: 'legacy.text.summary.txt' }
      ]
    },

    exclude: [
    ],


    browsers: ["Chrome", "Firefox"]

  })
}
