const productModel = require('../models/product.model')

class ProductController {
  async getAll(req, res) {
    try {
      const products = await productModel.find()
      return res.json(products)
    } catch (e) {
      console.log(e)
    }
  }

  async getOne(req, res) {
    const { id } = req.params
    const product = await productModel.findOne({ id })
    if (product) {
      return res.json(product)
    } else {
      console.log('not yet')
    }
  }

  async createProduct(req, res) {
    const productData = req.body
    const newProduct = await productModel.create(productData)
    return res.status(201).json(newProduct)
  }
}

module.exports = new ProductController()
