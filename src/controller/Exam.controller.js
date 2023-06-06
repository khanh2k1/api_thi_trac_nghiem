const ExamModel = require("../model/Exam.model");
const mongoose = require('mongoose')
const IsObjectId = require('../validators/ObjectId.validator')
const ExamController = {
  // get all exam
  getAll: async (req, res) => {
    await ExamModel.find()
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
    const id = await req.params.id;
   
    const exam = await ExamModel.findOne({_id: id})

    if(!exam) {
      return res.status(404).json({
        success:false,
        message:"not found"
      })
    }

    res.json({
      success: true,
      message: exam
    });
  },


  // get all exam which user created
  getByUsername: async (req, res) => {
    const username = await req.username;
    const exams = await ExamModel.find({ createdBy: username });
    res.json({
      success: true,
      exams,
    });
  },

  // create a exam
  create: async (req, res) => {
    
    let exam = await ExamModel.findOne({name: req.body.name})

    if(exam) {
      console.log('exam has existed')
      return res.status(400).json({
        success:false,
        message:"exam has existed"
      })
    }

    exam = await ExamModel(req.body.exam)
    exam['createdBy'] = req.user.username
    await exam.save().then((data)=>{
      console.log('create exam successfully')
      res.json({
        success:true,
        message: 'create a new exam successfully'
      })
    })
  },

  // update question in exam
  update: async (req, res) => {

    const { id } = req.params
    
  
    const { name, isPublic, description, createdBy } = req.body;

    await ExamModel.findByIdAndUpdate(id, {name, isPublic, description, createdBy})
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

  updateQuestions : async(req, res) => {
    const { questions } = req.body;

    await ExamModel.findByIdAndUpdate(req.params.id, {questions})
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
    const id = req.body.id;

    await ExamModel.findByIdAndDelete(id)
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
