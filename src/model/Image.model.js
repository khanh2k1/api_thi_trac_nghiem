const mongoose = require("mongoose");

// Khởi tạo cấu trúc lưu trữ ảnh trong MongoDB
const ImageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String
});

module.exports = mongoose.model('Image', ImageSchema)