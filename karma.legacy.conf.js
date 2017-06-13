const sharedConf = require("./karma.shared.conf.js");

module.exports = function (config) {
  sharedConf(config)

  config.set({

    files: [
      "test/fixture/proauth-settings.js",
      "test/fixture/tests-settings.js",
      "lib/client.js",
      "lib/legacy.js",
      "test/**/*.js"
    ],


    exclude: [
    ],


    browsers: ["Chrome", "Firefox"]

  })
}
