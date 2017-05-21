// 检查nodeJs和npm的版本
require('./check-versions')()

// 获取配置
var config = require('../config')
// 如果node的环境变量中没有设置当前的环境(node_env)，则使用config中的配置作为当前环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// 一个可以调用默认软件打开网址、图片和文件等内容的插件
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')

// 一个express中间件，用于将http请求代理到其他服务器
// 可以使用该插件将前端开发中涉及到的请求代理到API服务器上，方便与服务器对接
var proxyMiddleware = require('http-proxy-middleware')

// 根据node环境来引入相应的webpack配置
var webpackConfig = require('./webpack.dev.conf')

/*
* var webpackConfig= process.env.NODE_DEV==='testing'
*                     ?require('./webpack.prod.conf)
*                     :require('./webpack.dev.conf)
* */




// default port where dev server listens for incoming traffic
// dev-server监听的端口，默认为8080
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

// 创建1个express实例
var app = express()
// 根据webpack配置文件创建Compiler对象
var compiler = webpack(webpackConfig)

//将data.json数据导入
var data = require("../static/data/data.json")
var seller = data.seller
var ratings = data.ratings
var goods = data.goods

var routes = express.Router()
//服务端响应
routes.get('/seller', function (req, res) {
  res.json({
    // 状态码
    errno: 0,
    data: seller
  });
});

routes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

routes.get('/rating', function (re1, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});
//由路径/api获取到数据 node.js express搭建的web服务器 模拟后台数据
app.use("/api", routes)

// webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
// 编译绑定后将得到的产物存放在内存中而没有写进磁盘
// 将这个中间件交给express使用之后即可访问这些编译后的产品文件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests 将proxyTable中的代理请求配置挂载到express服务器上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  // 格式化options，例如将'www.example.com'变成{target:'www.example.com'}
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
//？将静态资源挂到express服务器上
app.use(staticPath, express.static('./static'))
//应用的地址信息，例如:http:lacalhost:8080
var uri = 'http://localhost:' + port
//提示语句
devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

//启动express服务器并监听相应的端口
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
