const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String }, // 分类名
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  level: { type: Number }, // 层级
  goodsCount: { type: Number }, // 该分类下商品总数
  goodsUnit: { type: String },  // 商品单位
  showStatus: { type: Boolean }, // 是否显示
  sort: { type: Number }, // 排序
  icon: { type: String }, // 分类图标
  keywords: { type: String }, // 关键字
  description: { type: String }, // 描述
})

module.exports = mongoose.model('Category', schema)