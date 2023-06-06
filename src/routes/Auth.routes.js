const express = require('express')
const router = express.Router()

const AuthController = require('../controller/Auth.controller')
const AuthSchema = require('../schemas/Auth.schema')
const requestValidator = require('../validators/Request.validator')

// routes auth
router.post('/register', requestValidator(AuthSchema.register, "body"), AuthController.register)
router.post('/', requestValidator(AuthSchema.login, "body"), AuthController.login)
router.post('/refresh', AuthController.refreshToken)

module.exports = router