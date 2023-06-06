const joi = require("joi");

// Define the validation schema for the Exam model
const ExamSchema = {

  create: joi.object({
    name: joi.string().required().min(3),
    description: joi.string().optional(),
    questions: joi.array().items(
      joi.object({
        questionText: joi.string().required(),
        answers: joi.array().items(joi.string().required()).required(),
        correctAnswer: joi.number().required(),
      })
    ),
    createdBy: joi.string().required(),
    isPublic: joi.boolean().default(false),
  }),

  updateQuestions: joi.object({
    questions: joi.array().items(
      joi.object({
        questionText: joi.string().required(),
        answers: joi.array().items(joi.string().required()).required(),
        correctAnswer: joi.number().required(),
      })
    ),
  }),

  update: joi.object({
    name: joi.string().required().min(3),
    description: joi.string().optional(),
    createdBy: joi.string().required(),
    isPublic: joi.boolean().default(false),
  }),

  



};

module.exports = ExamSchema;
