module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Divination-test/'
    : '/',
  // https://stackoverflow.com/questions/54145735/vue-pwa-not-getting-new-content-after-refresh
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  }
}