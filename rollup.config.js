'use strict'

/* global process */

const inDevelopment = () => process.env.BUILD_ENV && ['development', 'dev', 'develop'].indexOf(process.env.BUILD_ENV.toLowerCase()) >= 0

const target = (target => {
  target = String(target).toLowerCase()
  if (['client', 'default', 'legacy', 'service', 'service-worker'].indexOf(target) < 0) throw Error('Invalid target')
  return target
})(process.env.BUILD_TARGET)

const rollupOpts = {
  entry: `src/${target}.js`,
  moduleName: 'proauth',
  format: 'iife',
  dest: `lib/${target}.es2015.js`
}

if (inDevelopment()) {
  rollupOpts.sourceMap = 'inline'
}

export default rollupOpts
