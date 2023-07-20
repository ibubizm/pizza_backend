const { Schema, model } = require('mongoose')

const productShema = Schema({
  id: { type: Number },
  imageUrl: { type: String },
  name: { type: String, required: true },
  types: { type: [String] },
  sizes: { type: [Number] },
  price: { type: [Number] },
  category: { type: Number, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
})

module.exports = model('Product', productShema)
