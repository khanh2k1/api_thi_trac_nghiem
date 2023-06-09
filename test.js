var nodemailer = require("nodemailer"); // khai báo sử dụng module nodemailer
async function sendEmail() {
  var transporter = nodemailer.createTransport({
    // config mail server
    service: "Gmail",
    auth: {
      user: "tanle6378@gmail.com",
      pass: '0349031716tan',
    },
  });
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "Thanh Batmon",
    to: "n19dccn089@student.ptithcm.edu.vn",
    subject: "Test Nodemailer",
    text: "You recieved message from ",
  };
  await transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
}

sendEmail()
