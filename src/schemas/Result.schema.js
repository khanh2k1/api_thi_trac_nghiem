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

    exam: joi.object(
      {
        examId: joi.string(),
        name: joi.string().required().min(3),
        totalTime: joi.number().required(),
        description: joi.string().optional(),
        image: joi.string(),

        questions: joi.array().items(
          joi.object({
            questionText: joi.string().required(),
            answers: joi.array().items(joi.string()).required()
          })
        ),

        correctAnswers:  joi.array().items(joi.number()),

        createdBy: joi.string().hex().length(24),
        isPublic: joi.boolean().default(false),
      })
  }),
};

module.exports = ResultSchema

// exam: ExamSchema.create.required(),