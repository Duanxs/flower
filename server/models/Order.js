const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  orderSn: { type: String }, // 订单编号
  username: { type: String }, // 用户
  totalAmount: { type: String }, // 总金额
  goodsId: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Goods' }], // 商品 ObjectId
  status: { type: Number }, // 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单
  autoConfirmTime: {type: Number}, // 自动确认收货时间
  confirmStatus: {type: Number}, // 确认收货状态
  receiverName: { type: String }, // 收货人姓名
  receiverPhone: { type: String }, // 收货人电话
  receiverProvince: { type: String }, // 省/直辖市
  receiverCity: { type: String }, // 市
  receiverRegion: { type: String }, // 区
  receiverAddress: { type: String }, // 详细地址
  note: { type: String }, // 订单备注
  paypaymentTime: { type: Date }, // 支付时间 
  delivery_time: { type: Date }, // 发货时间
  receive_time: { type: Date }, // 收货时间
  modify_time: { type: Date }, // 修改时间
})

module.exports = mongoose.model('Order', schema)