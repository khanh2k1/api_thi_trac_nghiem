const router = require('express').Router()

const RoomController = require('../controller/Room.controller')
const AuthMiddlewares = require('../middlewares/Auth.middleware')
// const RoomSchema = require('../schemas/Room.schema')
const ObjectId = require('../validators/ObjectId.validator')
const requestValidator = require('../validators/Request.validator')
// exam
//create new exam
router.post('/', AuthMiddlewares.isAuth, RoomController.create)
// get all room
router.get('/all',RoomController.getAll)
// get room by id
router.get('/:id', AuthMiddlewares.isAuth, ObjectId ,RoomController.get)
// //update exam
// router.patch('/:id', AuthMiddlewares.isAuth, ObjectId ,requestValidator(RoomSchema.update, "body"), RoomController.update)
// // delete exam
// router.delete('/', AuthMiddlewares.isAuth, ObjectId, RoomController.delete)
// // start to exam 
// router.get('/start-to-exam', RoomController.startToExam)
module.exports = router