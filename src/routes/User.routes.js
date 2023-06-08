const router = require('express').Router()
const UserController = require('../controller/User.controller')
const AuthMiddlewares = require('../middlewares/Auth.middleware')
const requestValidator = require('../validators/Request.validator')
const UserSchema = require('../schemas/User.schema')
const ObjectId = require('../validators/ObjectId.validator')
// CRUD image
const FileUtils = require('../utils/File.utils')

router.get('/', AuthMiddlewares.isAuth, UserController.getProfile)
router.patch('/:id', AuthMiddlewares.isAuth, UserController.changePassword)
router.post('/')
router.patch('/', FileUtils.upload.single('image'), AuthMiddlewares.isAuth, requestValidator(UserSchema.update, "body"), UserController.update)
module.exports = router