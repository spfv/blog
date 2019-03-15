# blog
### 前端浏览和打包部署
服务器启动需配置数据库 开启 server.js

```
//相关文件夹安装依赖 
cnpm install
//本地浏览
cnpm run dev-admin
cnpm run dev-client
//部署打包
cnpm run build-admin
cnpm run build-client


//具体设置在package.json,可更改
"scripts": {
"dev-client": "webpack-dev-server --inline --progress --config client/build/webpack.dev.conf.js",
"build-client": "node client/build/build.js",
"dev-admin": "webpack-dev-server --inline --progress --config admin/build/webpack.dev.conf.js",
"build-admin": "node admin/build/build.js",
"server": "node server/server.js",
......
},

```
