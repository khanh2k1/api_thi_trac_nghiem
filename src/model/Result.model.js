const mongoose = require("mongoose");

// Tạo schema kết quả thi
const ResultSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Exam",
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    userAnswers: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", ResultSchema);
