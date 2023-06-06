const mongoose = require("mongoose");
const QuestionModel = require("./Question.model");

// Tạo schema bài thi
const ExamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false
    },
    questions: {
      type: [QuestionModel.schema],
      required: true,
    },
    createdBy: {
      type: String,
      required: true
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// "Exam" will be save in mongoDB with name "Exam"
module.exports = mongoose.model("Exam", ExamSchema);
