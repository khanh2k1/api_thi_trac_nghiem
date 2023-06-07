const mongoose = require("mongoose");
const ExamModel = require("../model/Exam.model");
// Tạo schema kết quả thi
const ResultSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    exam: {
      type: ExamModel.schema,
      required: true,
    },
    userAnswers: [
      {
        type: number,
        required: true,
      },
    ],
    timeFinish: {
      type: number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", ResultSchema);
