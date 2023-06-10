const fs = require('fs');
const path = require('path')
function imageToBase64(imagePath) {
  // Đọc hình ảnh từ file
  const image = fs.readFileSync(imagePath);

  // Mã hóa hình ảnh thành chuỗi base64
  const base64Image = Buffer.from(image).toString('base64');

  return base64Image;
}

// Sử dụng hàm imageToBase64
const filePath = path.join('src','images','linh.jpg')

const base64String = imageToBase64(filePath);
console.log(base64String);