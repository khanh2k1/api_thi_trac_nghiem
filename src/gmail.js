const nodemailer = require("nodemailer");

// Tạo một đối tượng transporter với thông tin cấu hình email của bạn
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "trungkiencntt314@gmail.com", // Địa chỉ email của bạn
    pass: "kienpro890", // Mật khẩu email của bạn
  },
});

// Định nghĩa các tùy chọn email
let mailOptions = {
  from: "trungkiencntt314@gmail.com", // Địa chỉ email gửi
  to: "trungkiencntt516@gmail.com", // Địa chỉ email người nhận
  subject: "Hello from Node.js", // Chủ đề email
  text: "This is a test email sent from Node.js.", // Nội dung email dạng text
  // html: "<h1>Hello from Node.js</h1><p>This is a test email sent from <b>Node.js</b>.</p>", // Nội dung email dạng HTML
};

// Sử dụng transporter để gửi email với các tùy chọn đã định nghĩa
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

transporter.sendMail(mailOptions)