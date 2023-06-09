
const mongoose = require("mongoose");


// Tạo schema User
const UserSchema = new mongoose.Schema(
  {
    image : {
      type: String,
    },
    firstname: {
      type: String,
      required: true,
    },
    email: {
      type:String,
      required: true
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    // hashedOTP
    opt: {
      type:String,
      required:false,
    }
  },
);

module.exports = mongoose.model("User", UserSchema);
