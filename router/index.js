const Router = require('express')
const ProductController = require('../controllers/productController')

const router = Router()

router.get('/products', ProductController.getAll)
router.post('/create', ProductController.createProduct)
router.get('/products/:id', ProductController.getOne)

module.exports = router
