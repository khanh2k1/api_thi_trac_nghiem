const router = require("express").Router();
const ResultController = require("../controller/Exam.controller");
const AuthMiddlewares = require("../middlewares/Auth.middleware");
const ResultSchema = require("../schemas/Exam.schema");
const ObjectId = require("../validators/ObjectId.validator");
const requestValidator = require("../validators/Request.validator");

router.get('/', 
AuthMiddlewares.isAuth, 
ObjectId, 
ResultController.get)

router.get('/all',
AuthMiddlewares.isAuth, 
ObjectId, 
ResultController.getAll)


