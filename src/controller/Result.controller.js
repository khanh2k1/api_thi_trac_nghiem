const ResultModel = require("../model/Exam.model");
const mongoose = require("mongoose");
const IsObjectId = require("../validators/ObjectId.validator");
const ExamUtils = require("../utils/Exam.utils");
const ResultUtils = require("../utils/Result.utils");

const ResultController = {
  get: async (req, res) => {
    const _id = req.params.id;
    const result = await ResultModel.findOne({ _id });

    if (!result) {
      return res.status(404).json({
        success:false,
        message:"not found"
      });
    }

    // get correctAnswers and userAnswers
    const { correctAnswers, examId, name} = result['exam']
    const { userAnswers } = result
    console.log(correctAnswers, userAnswers)
    
    const score = ResultUtils.calculateScore(correctAnswers, userAnswers)


    res.json({
        success:true,
        message:examId, name, score
    })    
  },

  getAll: async (req, res) => {
    const results = await ResultModel.find().then((data)=>{
        console.log(`results get-all = ${data}`)
        res.json({
            success:true,
            message:results
        })
    }).catch(error=>{
        console.log(`error result get-all`)
        res.status(422).json({
            success:false,
            message:"error get-all results by userId"
        })
    })
  },
};


