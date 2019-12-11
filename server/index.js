// 安装 express cors
// 引用 express
const express = require('express')

// 定义 express 实例
const app = express()

// 在 app 上添加变量
app.set('secret', 'flower')

app.use(require('cors')())
app.use(express.json())
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/uploads', express.static(__dirname + '/uploads'))

// 传入 app 可以在 routes/admin 中使用
require('./routes/admin')(app)
require('./plugins/db')(app)


app.listen(3000, ()=> {
  console.log('http://localhost:3000')
})