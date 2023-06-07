const mongoose = require("mongoose");

// Tạo schema cho hình ảnh
const ImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

module.exports = mongoose.model('Image', ImageSchema)