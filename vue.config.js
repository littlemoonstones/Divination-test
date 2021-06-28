module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Divination-test/'
    : '/',
  // https://stackoverflow.com/questions/54145735/vue-pwa-not-getting-new-content-after-refresh
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  // https://stackoverflow.com/questions/62023604/where-to-find-or-how-to-set-htmlwebpackplugin-options-title-in-project-created-w
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Divination";
        return args;
      })
  }
}