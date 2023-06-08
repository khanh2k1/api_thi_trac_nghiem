// Cấu hình Multer để lưu trữ ảnh tải lên
const multer = require("multer");
const storage = multer.memoryStorage();
const fs = require("fs");
const path = require("path");

const FileUtils = {
  upload: multer({ storage: storage }),

  getDefaultImage: () => {
    const filePath = path.join("src", "images", "linh.jpg");
    const defaultImageBuffer = fs.readFileSync(filePath);

    return defaultImageBuffer;
  },
};


module.exports = FileUtils;
