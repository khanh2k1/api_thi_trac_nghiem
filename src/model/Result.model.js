const mongoose = require("mongoose");
const ExamModel = require("../model/Exam.model");
// Tạo schema kết quả thi
const ResultSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    exam: {
      type: ExamModel.schema,
    },
    userAnswers: [
      {
        type: Number,
      },
    ],
    timeFinish: {
      type: Number,
    },
  },
);

module.exports = mongoose.model("Result", ResultSchema);
