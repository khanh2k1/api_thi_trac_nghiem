const mongoose = require("mongoose");

// Tạo schema phòng thi
const RoomSchema = mongoose.Schema(
  {
    roomId: {
      type:String,
      required: true
    },
    totalTime: {
      type: Number,
      required: true,
    },
    examId: {
      type: String,
      required: true,
    },
    createdBy: {
      type:  mongoose.mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isEnd: {
      type:Boolean,
      default: false
    },
    examiners: {
      type: [
        {
          type: mongoose.mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
