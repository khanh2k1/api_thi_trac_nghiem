const ExamModel = require("../model/Exam.model");
const ExamUtils = require("../utils/Exam.utils");
const imageBuffer = require('../variables/imageBuffer')
const ExamController = {
  // get all exam
  getAll: async (req, res) => {
    await ExamModel.find({isPublic: true})
      .then((data) => {
        console.log("get exams successfully");
        res.json({
          success: true,
          message: data,
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

  // get a exam
  get: async (req, res) => {
    const _id = await req.params._id;

    const exam = await ExamModel.findOne({ _id });

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }

    res.json({
      success: true,
      message: exam,
    });
  },

  // get all exam which user created
  getByCreated: async (req, res) => {
    const createdBy = await req.user._id;
    console.log(createdBy)
    const exams = await ExamModel.find({createdBy});
    res.json({
      success: true,
      exams,
    });
  },

  // get exam by examId
  getExamByExamId : async(req, res) => {
    const examId = req.body
    if(!examId) {
      return res.status(401).json({
        success:false,
        message:"invalid exam id"
      })
    }
    const exam = await ExamModel.findOne({examId})
    if(!exam) {
      return res.status(404).json({
        success:falses,
        message: "not found exam"
      })
    }

    res.json({
      success:true,
      message: exam
    })
  },

  // create a exam
  create: async (req, res) => {
    
    let exam = await ExamModel(req.body);
    const image = req.file.buffer || imageBuffer
    exam['image'] = image
    exam["createdBy"] = req.user._id;
    exam["examId"] = ExamUtils.generateId();

    console.log(req.body.correctAnswers)

    await exam.save().then((data) => {
      console.log("create exam successfully");
      res.json({
        success: true,
        message: "create a new exam successfully",
      });
    }).catch(err=>{
      console.log('error create exam', err)
      res.status(422).json({
        success:false,
        message: err
      })
    })
  },

  // update infor of exam
  update: async (req, res) => {
    const { _id } = req.params;
    const exam = await ExamModel.findOne({ _id });
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }
    const { name, isPublic, description, totalTime } = req.body;

    await ExamModel.findByIdAndUpdate(_id, {
      name,
      isPublic,
      description,
      totalTime,
    })
      .then(() => {
        console.log("update information of exam successfully");
        res.json({
          success: true,
          message: "updated information of exam successfully",
        });
      })
      .catch((error) => {
        console.log("error updated information of exam: ", error);
        res.status(422).json({
          success: false,
          message: "updated information of exam failure: ",
          error,
        });
      });
  },

  // update question of exam
  updateQuestions: async (req, res) => {
    const { questions, correctAnswers } = req.body;
    console.log(correctAnswers)
    const _id = req.params._id;
    const exam = await ExamModel.findById({ _id });
    if (!exam) {
      console.log("exam not found to update questions");
      return res.status(404).json({
        success: false,
        message: "exam not found to update questions",
      });
    }

    await ExamModel.findByIdAndUpdate
    (
      _id, 
      { $set: { questions, correctAnswers } }
    )
      .then(() => {
        console.log("update questions successfully");
        res.json({
          success: true,
          message: "updated questions successfully",
        });
      })
      .catch((error) => {
        console.log("error updated questions: ", error);
        res.status(422).json({
          success: false,
          message: "updated questions failure: ",
          error,
        });
      });
  },

  // delete a exam
  deleteExam: async (req, res) => {
    const createdBy = req.user._id;

    await ExamModel.findOnedAndDelete(createdBy)
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
};

module.exports = ExamController;
