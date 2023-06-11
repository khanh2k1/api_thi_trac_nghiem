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
      type: {
        name: {
          type: String,
        },
        examId: {
          type:String,
        },
        totalTime: {
          type:Number,
        },
        description: {
          type: String,
        },
        questions: {
          type: [QuestionModel.schema],
        },
        correctAnswers: [{
          type:Number,
        }],
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User"
        },
        isPublic: {
          type: Boolean,
          default: false
        }
      },
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
