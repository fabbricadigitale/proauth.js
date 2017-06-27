"use strict"

const globalConfig = require("./saucelabs.config.global.json")

let config

try {
  const localConfig = require("./saucelabs.config.local.json")
  config = Object.assign({}, globalConfig, localConfig)
} catch (ex) {
  config = Object.assign({}, globalConfig)
}

module.exports = config
