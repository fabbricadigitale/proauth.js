'use strict'

/* global process */

import babel from 'rollup-plugin-babel';

function inDevelopment() {
  return process.env.BUILD_ENV && ['development', 'dev', 'develop'].indexOf(process.env.BUILD_ENV.toLowerCase()) >= 0
}

var babelOpts = {
  presets: ['es2015-rollup'],
  exclude: 'node_modules/**'
}

var rollupOpts = {
  entry: 'src/client.js',
  moduleName: 'proauth',
  format: 'umd',
  plugins: [ babel(babelOpts) ],
  dest: 'dist/client.js'
}

if (inDevelopment()) {
  rollupOpts.sourceMap = 'inline'
}

export default rollupOpts
