const router = require('express').Router()
const UserController = require('../controller/User.controller')
const AuthMiddlewares = require('../middlewares/Auth.middleware')


router.get('/', AuthMiddlewares.isAuth, UserController.getProfile)
router.patch('/:id', AuthMiddlewares.isAuth, UserController.changePassword)
router.post('/')
module.exports = router