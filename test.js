const json_corrects = '["1", "2"]';

// Phân tích cú pháp chuỗi JSON và chuyển đổi thành mảng
const objects = JSON.parse(json_corrects)

const integerArray = objects.map(item=>Number(item))

console.log(typeof integerArray[0]);



