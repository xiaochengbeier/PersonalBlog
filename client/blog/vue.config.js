module.exports = {
    devServer: {
      proxy: {
        '/': {
          target: 'http://localhost:8888',// 要跨域的域名
          changeOrigin: true, // 是否开启跨域
        }
      }
    }
  }