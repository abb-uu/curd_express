// 引包
const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')

// 创建服务器
const app = express()

// 开放资源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

// 引入模版
app.engine('html', require('express-art-template'))

// 配置 body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 路由
app.use(router)

// 设置端口号
app.listen(3000, () => {
  console.log('running...')
})