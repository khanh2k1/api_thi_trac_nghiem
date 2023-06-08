const express = require('express')
const router = express.Router()

const AuthController = require('../controller/Auth.controller')
const AuthSchema = require('../schemas/Auth.schema')
const requestValidator = require('../validators/Request.validator')

// CRUD image
const FileUtils = require('../utils/File.utils')


// routes auth
router.post('/register', FileUtils.upload.single('image'), requestValidator(AuthSchema.register, "body"), AuthController.register)
router.post('/login', requestValidator(AuthSchema.login, "body"), AuthController.login)
router.post('/refresh', AuthController.refreshToken)

module.exports = router