module.exports = {
  outputDir: 'build',
  configureWebpack: (config) => {
    require('vux-loader').merge(config, {
      options: {},
      plugins: [
        'vux-ui',
        'duplicate-style',
        {
          name: 'less-theme',
          path: 'src/theme.less',
        },
      ],
    })
  },

  chainWebpack: (config) => {
    // set worker-loader
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end()

    // Giải quyết: Vấn đề cập nhật nóng worker
    config.module.rule('js').exclude.add(/\.worker\.js$/)
  },

  devServer: {
    https: false,
    headers: {
      // 'Cross-Origin-Embedder-Policy': 'require-corp',
      // 'Cross-Origin-Opener-Policy': 'same-origin',
      // 'Cross-Origin-Resource-Policy': 'same-site',
    },
  },

  pluginOptions: {
    i18n: {
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
}
