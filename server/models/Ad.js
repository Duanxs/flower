const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  items: [{
    url: { type: mongoose.SchemaTypes.ObjectId, ref: 'Goods' },
    image: { type: String },
  }],
})

module.exports = mongoose.model('Ad', schema)