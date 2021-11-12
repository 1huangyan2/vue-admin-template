module.exports = {
  chainWebpack: (config) => {
    // 全局scss变量配置
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 全局变量资源路径
          resources: [__dirname + '/src/styles/variable.scss']
        })
        .end()
    })
    config.plugin('html').tap((args) => {
      args[0].title = '评价管理系统'
      return args
    })
  }
}

