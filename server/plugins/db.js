module.exports = app => {
  // const express = require('express')
  // const router = express.Router()  // express 的子路由

  // // categories
  // router.get('/goods', async (req, res) => {
  //   res.send('goods')
  // })

  // app.use('/admin/api', router)

  const mongoose = require('mongoose')
  //连接数据库
  mongoose.connect('mongodb://127.0.0.1:27017/flower', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
}