const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/cp_api': {
        target: process.env.VUE_APP_DATA_BASE_API,//目标地址
        secure: false,
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/cp_api': '/api'
        }    //这里重写路径，路径中含有api就不需要重写
      },
      '/login_api': {
        target: process.env.VUE_APP_LOGIN_BASE_API,//目标地址
        secure: false,
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端,然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/login_api': '/'
        }    //这里重写路径，路径中含有api就不需要重写
      }

    }
  }
})
