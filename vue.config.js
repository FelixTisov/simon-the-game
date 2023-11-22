const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/simon-the-game/' : '/',
  transpileDependencies: true,
})
