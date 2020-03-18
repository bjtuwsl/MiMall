module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8088,
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  // publicPath: '/app',
  // outputDir: 'dist',
  // indexPath: 'index2.html',
  // lintOnSave: false,//取消校验
  productionSourceMap: false,//关闭map
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  }
}