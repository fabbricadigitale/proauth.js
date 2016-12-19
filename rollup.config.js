'use strict'

/* global process */

import babel from 'rollup-plugin-babel';

function inDevelopment() {
  return process.env.BUILD_ENV && ['development', 'dev', 'develop'].indexOf(process.env.BUILD_ENV.toLowerCase()) >= 0
}

var target = (function(target) {
  target = String(target).toLowerCase()
  if (['client', 'legacy', 'service'].indexOf(target) < 0) throw Error('Invalid target')
  return target
})(process.env.BUILD_TARGET)

var babelOpts = {
  presets: ['es2015-rollup'],
  exclude: 'node_modules/**'
}

var rollupOpts = {
  entry: `src/${target}.js`,
  moduleName: 'proauth',
  format: 'umd',
  plugins: [ babel(babelOpts) ],
  dest: `dist/${target}.js`
}

if (inDevelopment()) {
  rollupOpts.sourceMap = 'inline'
}

export default rollupOpts
