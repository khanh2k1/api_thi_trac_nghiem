const joi = require("joi");
const ImageSchema = require("./Image.schema");
// Define the validation schema for the Exam model
const ExamSchema = {

  create: joi.object({
    examId: joi.string(),
    name: joi.string().required().min(3),
    totalTime: joi.number().required(),
    description: joi.string().optional(),
    image: joi.string(),
    questions: joi.string(),
    correctAnswers: joi.string(),
    createdBy: joi.string().hex().length(24),
    isPublic: joi.boolean().default(false),
  }),



  update: joi.object({
    name: joi.string().min(3),
    description: joi.string().optional(),
    isPublic: joi.boolean().default(false),
    totalTime: joi.number(),
    questions: joi.string(),
    correctAnswers: joi.string()
  }),
};

module.exports = ExamSchema;
