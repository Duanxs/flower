module.exports = options => {
  return async (req, res, next) => {

    let modelName = req.params.resource
    // console.log(modelName)

    // 使用 inflection 格式化模型名
    if (modelName === 'goods') {
      modelName = 'Goods'
    } else {
      modelName = require('inflection').classify(modelName)
    }
    console.log(modelName)
    // 将模型挂载到 req 上
    req.Model = require(`../models/${modelName}`)
    next()
  }
}