// 安装 inflection ,实现单词单复数转换以及类名转换
module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  // 引入 错误处理 库
  const assert = require('http-assert')

  // 引入 AdminUser 模型
  const AdminUser = require('../../models/AdminUser')
  
  const router = express.Router({
    // 合并参数， 以便子路由获取参数
    mergeParams: true
  })  // express 的子路由

  // 引入 Category 模型
  // const Category = require('../../models/Category')
  // 创建 Category 模型 
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 修改分类名
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除分类
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  // 获取分类
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
      queryOptions.limit = parseInt(req.query.limit)
    } else if (req.Model.modelName === 'Goods') {
      queryOptions.populate = 'category'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })

  // 获取分类详情接口
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  const authMiddleWare = require('../../middleWare/auth')
  const resourceMiddleWare = require('../../middleWare/resource')

  app.use('/admin/api/common/:resource',authMiddleWare(), resourceMiddleWare(), router)

  
  // 文件上传
  // 安装 multer 中间件来获取上传的文件
  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload',authMiddleWare(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    console.log(file)
    res.send(file)
  })

  // 登录路由
  app.post('/admin/api/login', async(req, res) => {
    const { username, password} = req.body

    // 1. 根据用户名查询用户
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')
    // if(!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }

    // 2. 校验密码
    const isValid = require('bcryptjs').compareSync(password,user.password)
    assert(isValid, 422, '密码错误')
    // if(!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }

    // 3. 返回 Token
    // 安装 jsonwebtoken
    const token = jwt.sign({id: user._id}, app.get('secret'))
    
    res.send({token})
  })


  // 错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}