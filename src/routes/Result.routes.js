const router = require("express").Router();
const ResultController = require("../controller/Result.controller");
const AuthMiddlewares = require("../middlewares/Auth.middleware");
const ResultSchema = require("../schemas/Result.schema");
const ObjectId = require("../validators/ObjectId.validator");
const requestValidator = require("../validators/Request.validator");

// CRUD image
const FileUtils = require('../utils/File.utils')

router.get("/:_id", AuthMiddlewares.isAuth, ObjectId, ResultController.get);

router.get("/", AuthMiddlewares.isAuth, ResultController.getAll);

router.post(
  "/",
  AuthMiddlewares.isAuth,
  requestValidator(ResultSchema.create, "body"),
  ResultController.create
);

router.delete('/:_id', AuthMiddlewares.isAuth, ObjectId, ResultController.delete)
module.exports = router;
