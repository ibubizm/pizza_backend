const Router = require('express')
const ProductController = require('../controllers/productController')

const router = Router()

router.get('/products/:id', ProductController.getOne)
router.get('/products', ProductController.getAll)
router.post('/create', ProductController.createProduct)
router.patch('/update', ProductController.updateProduct)

module.exports = router
