const router = require('express').Router()
const UserController = require('../controller/User.controller')
const AuthMiddlewares = require('../middlewares/Auth.middleware')

// CRUD image
const FileUtils = require('../utils/File.utils')

router.get('/', AuthMiddlewares.isAuth, UserController.getProfile)
router.patch('/:id', AuthMiddlewares.isAuth, UserController.changePassword)
router.post('/')
router.patch('/', FileUtils.upload.single('image'), AuthMiddlewares.isAuth, UserController.update)
module.exports = router