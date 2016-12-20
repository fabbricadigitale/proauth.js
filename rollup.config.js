'use strict'

/* global process */

const inDevelopment = () => process.env.BUILD_ENV && ['development', 'dev', 'develop'].indexOf(process.env.BUILD_ENV.toLowerCase()) >= 0

const target = (target => {
  target = String(target).toLowerCase()
  if (['client', 'legacy', 'service'].indexOf(target) < 0) throw Error('Invalid target')
  return target
})(process.env.BUILD_TARGET)

const rollupOpts = {
  entry: `src/${target}.js`,
  moduleName: 'proauth',
  format: 'umd',
  dest: `lib/${target}.js`
}

if (inDevelopment()) {
  rollupOpts.sourceMap = 'inline'
}

export default rollupOpts
