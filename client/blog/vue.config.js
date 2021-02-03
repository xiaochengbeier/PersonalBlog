// const  TerserPlugin  = require("terser-webpack-plugin"); 
module.exports =  {
    devServer: {
      proxy: {
        '/': {
          target: 'http://localhost:80',// 要跨域的域名
          changeOrigin: true, // 是否开启跨域
        }
      }
    },
  // 去除打包的.amp文件
  productionSourceMap:false,
  lintOnSave: true,
  // 配置webpack打包
  configureWebpack: (config) => {
    // 覆盖webpack默认配置的都在这里
    if (process.env.NODE_ENV === "production") {
      // config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      // config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
      //   "console.log"
      // ];
    }
  }
  }