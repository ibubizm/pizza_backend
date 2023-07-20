const { model, Schema } = require('mongoose')
const productSchema = require('../models/product.model')

const Order = new Schema({
  product: [productSchema.schema],
})

module.exports = model('Order', Order)
