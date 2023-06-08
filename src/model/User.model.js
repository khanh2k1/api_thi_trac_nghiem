
const mongoose = require("mongoose");
const FileUtils = require('../utils/File.utils')

// Tạo schema User
const UserSchema = new mongoose.Schema(
  {
    image : {
      type: Buffer,
      default: FileUtils.getDefaultImage()
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
