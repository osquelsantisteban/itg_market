const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/itg_market',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_I18N_FULL_INSTALL__: 'false',
        __VUE_I18N_LEGACY_API__: 'false',
        __INTLIFY_PROD_DEVTOOLS__: 'false',
      })
    ]
  }
})
