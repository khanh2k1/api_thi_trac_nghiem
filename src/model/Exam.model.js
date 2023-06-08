const mongoose = require("mongoose");
const QuestionModel = require("./Question.model");
const FileUtils = require('../utils/File.utils')
// Tạo schema bài thi
const ExamSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    examId: {
      type:String,
    },
    totalTime: {
      type:Number,
    },
    image: {
      type: Buffer,
      default: FileUtils.getDefaultImage()
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
  {
    timestamps: true,
  }
);

// "Exam" will be save in mongoDB with name "Exam"
module.exports = mongoose.model("Exam", ExamSchema);
