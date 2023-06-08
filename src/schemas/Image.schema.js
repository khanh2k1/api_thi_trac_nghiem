// Định nghĩa schema Joi để xác thực tập tin hình ảnh
const Joi = require("joi");
const ImageSchema = Joi.object({
  fieldname: Joi.string(),
  buffer: Joi.binary(),
  mimeType: Joi.string()
    .valid("image/jpeg", "image/png", "image/gif"),
});

module.exports = ImageSchema;