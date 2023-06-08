const joi = require('joi')
const ImageSchema = require('./Image.schema')
const AuthSchema = {
    register : joi.object({
        image: ImageSchema,
        firstname: joi.string().required().min(2),
        lastname: joi.string().required().min(2),
        email: joi.string().email().required(),
        username: joi.string().required().min(6),
        password: joi.string().min(6).required()
    }),

    login : joi.object({
        username: joi.string().required().min(6),
        password: joi.string().required().min(6)
    }),

    
}


module.exports = AuthSchema