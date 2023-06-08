const joi = require('joi')
const ImageSchema = require('./Image.schema')
const UserSchema = {
    update: joi.object({
        image: ImageSchema,
        firstname: joi.string().required().min(2),
        lastname: joi.string().required().min(2),
    }),

    changePassword : joi.object({
        password: joi.string().required().min(6)
    }),
}


module.exports = UserSchema