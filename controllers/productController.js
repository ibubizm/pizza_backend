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
    const product = await productModel.findOne({ _id: id })
    if (product) {
      return res.json(product)
    } else {
      console.log('not yet')
    }
  }

  async createProduct(req, res) {
    const productData = req.body
    try {
      productData.types =
        productData.types.length !== 0 ? productData.types.split(',') : []
      productData.sizes = productData.sizes.split(',')
      productData.price = productData.price.split(',')

      const newProduct = await productModel.create(productData)
      return res.status(201).json(newProduct)
    } catch (e) {
      console.log(e)
    }
  }

  async updateProduct(req, res) {
    const productData = req.body
    try {
      const product = await productModel.updateOne(
        { _id: productData._id },
        { $set: { imageUrl: productData.imageUrl } }
      )
      return res.status(201).json(product)
    } catch (e) {
      console.log(e)
    }
    console.log(productData, '00000')
  }
}

module.exports = new ProductController()
