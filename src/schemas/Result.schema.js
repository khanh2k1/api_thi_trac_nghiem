const joi = require("joi");
const ExamSchema = require('../schemas/Exam.schema')
// Define the validation schema for the Exam model
const ResultSchema = {
  
  create: joi.object({
    userId: joi.string().hex().length(24),
    timeFinish: joi.number().required(),
    userAnswers: joi.array().items(
      joi.number().required()
    ).required(),
    exam: ExamSchema.create.required(),
  }),
};

module.exports = ResultSchema

// exam: ExamSchema.create.required(),