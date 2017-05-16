# vue.js仿饿了么小部分（前端部分）

> vue.js2.0仿饿了么的一个小demo(vue2.0+vue-cli+axios+webpack+vue-router)

持续更新中.. 完整后整理记录会做总结

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目结构

<pre>
.
├── README.md
├── build // vue-cli 自带的配置文件
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config  // vue-cli 自带的配置文件
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── common
│   │   ├── fonts  //icon-font字体文件
│   │   ├── js  //公用js文件 暂时未添加
│   │   └── stylus //共用样式文件
│   ├── components
│   │   ├── cardShop
│   │   ├── foodsDetail
│   │   ├── foodsDetailTab
│   │   ├── footer
│   │   ├── goods
│   │   ├── goodsItem
│   │   ├── header
│   │   ├── loading
│   │   ├── rating
│   │   ├── selectTab
│   │   ├── seller
│   │   ├── shopCar
│   │   ├── slideBar
│   │   ├── star
│   │   └── tab
│   ├── main.js // 入口文件
│   ├── router  // 路由
│   │    └── index.js //路由信息
│   └── vuex  //状态管理信息 更新中..
│        └──  index.js  
└──  static

<code>
