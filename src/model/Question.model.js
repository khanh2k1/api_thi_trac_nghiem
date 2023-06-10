const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const validate = require('mongoose-validator');

// Tạo schema câu hỏi
const QuestionSchema = mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      
    },
    answers: [
      {
        type: String,
        required: true,
      },
    ],
  },
);

module.exports = mongoose.model("Question", QuestionSchema);
