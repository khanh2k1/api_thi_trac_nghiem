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
router.get('/search-by-examId/:examId', AuthMiddlewares.isAuth, ExamController.getExamByExamId)
// get all exams which isPublic: true
router.get("/all", ExamController.getAll);
// get exam
router.get("/:_id", ObjectId, ExamController.get);
// get info exam
router.post("/info-exam/", ExamController.getInfoExam)
// get all exams which user created
router.get("/", AuthMiddlewares.isAuth, ExamController.getCreatedBy)
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
router.delete("/:_id", AuthMiddlewares.isAuth, ObjectId, ExamController.deleteExam);

module.exports = router;
