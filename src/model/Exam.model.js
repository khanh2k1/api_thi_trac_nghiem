const mongoose = require("mongoose");
const QuestionModel = require("./Question.model");
const ImageModel = require('./Image.model')
// Tạo schema bài thi
const ExamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    examId: {
      type:String,
      required:true
    },
    totalTime: {
      type:Number,
      required:true
    },
    image: {
      type: ImageModel.schema,
      required:false
    },
    description: {
      type: String,
      required: false
    },
    questions: {
      type: [QuestionModel.schema],
      required: true,
    },
    correctAnswers: [{
      type:Number,
      required:true
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
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
