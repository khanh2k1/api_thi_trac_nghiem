// Định nghĩa schema Joi để xác thực tập tin hình ảnh
const Joi = require("joi");
const ImageSchema = Joi.object({
  fieldname: Joi.string().required(),
  buffer: Joi.binary().required(),
  mimeType: Joi.string()
    .valid("image/jpeg", "image/png", "image/gif")
    .required(),
});

module.exports = ImageSchema;