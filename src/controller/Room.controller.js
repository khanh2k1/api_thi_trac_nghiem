const RoomModel = require("../model/Room.model");
const ExamModel = require('../model/Exam.model')
const RoomUitls = require('../utils/Room.utils')
const RoomController = {

  getAll: async (req, res) => {
    await RoomModel.find()
      .then( async (data) => {
        console.log("get rooms successfully");
        const exam = await ExamModel.findOne({examName: data.examName})

        const totalQuestions = exam.questions.size()
        const {description, name} = exam
        const {roomId, totalTime} = data
        res.json({
          success: true,
          message: {roomId, totalTime, description, name, totalQuestions}
        });
      })
      .catch((error) => {
        console.log(error);

        res.json(422).json({
          success: false,
          message: error,
        });
      });
  },

  get: async (req, res) => {
    const id = await req.params.id;

    const room = await RoomModel.findOne({ _id: id });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }

   
    res.json({
      success: true,
      message: {},
    });
  },

  create: async (req, res) => {

    console.log(req.body.room.examId)
    const exam = await ExamModel.findOne({_id: req.body.room.examId})

    if(!exam) {
        return res.status(400).json({
            success:false,
            message:"cant find exam"
        })
    }

    const room = await new RoomModel(req.body.room);
    room['createdBy'] = req.user._id
    room['roomId'] = RoomUitls.generateRoomId()
    await room.save().then((data) => {
      console.log("create room successfully");
      res.json({
        success: true,
        message: room
      });
    });
  },

  update: async (req, res) => {},

  delete: async (req, res) => {
    const id = req.body.id;

    await RoomModel.findOneAndDelete({ _id: id, examiners: 0 })
      .then(() => {
        res.json({
          success: true,
          message: "deleted successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          success: false,
          message: "delete failure: ",
          error,
        });
      });
  },

  startToExam : async (req, res) => {
    // response : totalTime, exam, roomId

  }
};

module.exports = RoomController;
