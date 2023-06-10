const fs = require('fs');
const path = require('path')


const linhPath =  path.join('src','images','linh.jpg')
const avatarPath =  path.join('src','images','avatar.jpg')

function convertImageToBase64(imagePath) {
    const image = fs.readFileSync(imagePath);
    // Mã hóa hình ảnh thành chuỗi base64
    const base64Image = Buffer.from(image).toString('base64');
    return base64Image;
}
const ImageUtils = {
    linh: convertImageToBase64(linhPath),
    avatar: convertImageToBase64(avatarPath)
}

module.exports = ImageUtils