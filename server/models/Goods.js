const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 标题
  title: { type: String },
  // 分类
  category: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  // 花语
  goodsMean: { type: String },
  // 花材
  goodsInfo: { type: String },
  goodsPrice: { type: Number },
  linePrice: { type: Number },
  goodsSales: { type: Number },
  goodsStock: { type: Number },
  goodsViews: { type: Number },
  // 富文本
  content: { type: String },
  // goods_sort: { type: Number },
  // 商品状态 上架与否 1: 上架 0 下架
  goodsStatus: { type: String },
  // 商品图片
  file: [
    {
      url: { type: String },
    }
  ],

})

module.exports = mongoose.model('Goods', schema)