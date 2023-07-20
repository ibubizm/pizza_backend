const Router = require('express')
const AuthController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)
router.get('/auth', authMiddleware, AuthController.auth)

module.exports = router
