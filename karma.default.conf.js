const sharedConf = require("./karma.shared.conf.js");

module.exports = function (config) {
  sharedConf(config)

  config.set({

    files: [
      { pattern: "lib/service-worker.es2015.js", included: false }, // service-worker.es2015.js can be downloaded under /base/src/, but will not be loaded at startup
      "test/fixture/proauth-settings.js",
      "test/fixture/tests-settings.js",
      "lib/client.es2015.js",
      "lib/default.es2015.js",
      "test/**/*.js"
    ],


    exclude: [
      "test/unit/legacy/xhr-patched.js"
    ],


    browsers: ["Chrome", "Firefox"]

  })
}
