const router = require("express").Router();

const ExamController = require("../controller/Exam.controller");
const AuthMiddlewares = require("../middlewares/Auth.middleware");
const ExamSchema = require("../schemas/Exam.schema");
const ObjectId = require("../validators/ObjectId.validator");
const requestValidator = require("../validators/Request.validator");

// CRUD image
const FileUtils = require('../utils/File.utils')

// exam
//create new exam
router.post(
  "/",
  FileUtils.upload.single('image'), 
  AuthMiddlewares.isAuth,
  requestValidator(ExamSchema.create, "body"),
  ExamController.create
);

// nhap examId de lay exam
router.post('/:examId', ExamController.getExamByExamId)
// get all exams
router.get("/all", ExamController.getAll);
// get exam
router.get("/:_id", ObjectId, ExamController.get);

// get all exams which user created
router.get("/", AuthMiddlewares.isAuth, ExamController.getByCreated)
//update exam
router.patch(
  "/:_id",
  AuthMiddlewares.isAuth,
  ObjectId,
  requestValidator(ExamSchema.update, "body"),
  ExamController.update
);
//update questions of exam
router.patch(
  "/questions/:_id",
  AuthMiddlewares.isAuth,
  ObjectId,
  requestValidator(ExamSchema.updateQuestions, "body"),
  ExamController.updateQuestions
);
// delete exam
router.delete("/", AuthMiddlewares.isAuth, ExamController.deleteExam);

module.exports = router;
