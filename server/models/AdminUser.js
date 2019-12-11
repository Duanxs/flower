const mongoose = require('mongoose')

// 安装 bcyrpt 用于做密码的散列
const schema = new mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    // 默认不被查询
    select: false,
    set(val) {
      return require('bcryptjs').hashSync(val,10)
    }
  },
})

module.exports = mongoose.model('AdminUser', schema)