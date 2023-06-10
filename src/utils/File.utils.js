// Cấu hình Multer để lưu trữ ảnh tải lên
const multer = require("multer");
const storage = multer.memoryStorage();
const fs = require("fs");
const path = require("path");

const FileUtils = {
  upload: multer({ storage: storage }),
  // Mã hóa hình ảnh thành chuỗi base64
  base64Image: (image) => {
    return Buffer.from(image).toString('base64')
    
  }
};


module.exports = FileUtils;
