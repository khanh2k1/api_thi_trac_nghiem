const router = require('express').Router()
const UserController = require('../controller/User.controller')
const AuthMiddlewares = require('../middlewares/Auth.middleware')
const requestValidator = require('../validators/Request.validator')
const UserSchema = require('../schemas/User.schema')
const ObjectId = require('../validators/ObjectId.validator')
const FileUtils = require('../utils/File.utils')


router.get('/', AuthMiddlewares.isAuth, UserController.getProfile)
router.patch('/', AuthMiddlewares.isAuth, requestValidator(UserSchema.changePassword, "body"), UserController.changePassword)
router.patch('/update', FileUtils.upload.single('image'), AuthMiddlewares.isAuth, requestValidator(UserSchema.update, "body"), UserController.update)
module.exports = router