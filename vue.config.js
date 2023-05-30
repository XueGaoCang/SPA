const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: "http://gmall-h5-api.atguigu.cn",  //代理目标的基础路径，只包含到端口号

        pathRewrite: { '^api': '' }, //正则表达式会将以api1开头的路径将api1给替换成''

        changeOrigin: true,  //为true时请求头中的host会是代理服务器   flase时请求头中的host是服务器端口号
      }
    }
  }
})
