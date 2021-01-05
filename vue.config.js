module.exports = {
  lintOnSave: false, // 禁用eslint
  // baseUrl: process.env.NODE_ENV === 'production' ? 'https://www.mycdn.com/' : '/',
  productionSourceMap: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Emoit-Mate',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    login: {
      entry: 'src/login.js',
      template: 'public/login.html',
      filename: 'login.html',
      title: 'Emoit-Mate-Login',
      chunks: ['chunk-vendors', 'chunk-common', 'login'],
    },
  },
  devServer: {
    index: '/login.html', // 默认启动serve  http://localhost:8080/  打开的页面 login.html
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/xx': {
        target: 'http://reg.tool.hexun.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/xrf': '',
        },
      },
    },
  },
};
