const joi = require('joi')

const AuthSchema = {
    register : joi.object({
        firstname: joi.string().required().min(2),
        lastname: joi.string().required().min(2),
        username: joi.string().required().min(6),
        password: joi.string().min(6).required()
    }),

    login : joi.object({
        username: joi.string().required().min(6),
        password: joi.string().required().min(6)
    })
}


module.exports = AuthSchema