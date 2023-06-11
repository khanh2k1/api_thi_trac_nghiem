const ResultModel = require("../model/Result.model");
const IsObjectId = require("../validators/ObjectId.validator");
const ResultUtils = require("../utils/Result.utils");
const UserModel = require('../model/User.model')
const ResultController = {

  getAll: async (req, res) => {
    try {
      const userId = req.user._id
      // get correctAnswers and userAnswers
      let results_2 = [];
      const results = await ResultModel.find({userId});

      results.forEach((item) => {
        const { correctAnswers, examId, name, description } = item["exam"];
        const { userAnswers, _id } = item;
        

        const totalQuestions = item['exam']['questions'].length 
        const score = ResultUtils.calculateScore(correctAnswers, userAnswers) ;
        
        const object = { score, examId, name, description, _id, totalQuestions };
        results_2.push(object);
      });

      // console.log(results)
      res.json({
        success: true,
        message: results_2,
      });
    } catch (err) {
      console.log(err);
      res.status(422).json({
        success: false,
        message: "error get all results",
      });
    }
  },

  get: async (req, res) => {
    const _id = req.params._id;

    await ResultModel.findById({ _id }, {})
      .then((data) => {
        console.log(`results get-all = ${data}`);
        res.json({
          success: true,
          message: data,
        });
      })
      .catch((error) => {
        console.log(`error get result`, error);
        res.status(422).json({
          success: false,
          message: "error get result by userId",
        });
      });
  },

  create: async (req, res) => {

    // check user id
    const userId = req.user._id
    const user = await UserModel.findOne(userId)
    let result = await req.body


    if(!user) {
      return res.status(422).json({
        success: false,
        message: "invalid userId !",
      });
    }

    if(!result) {
      return res.status(422).json({
        success: false,
        message: "invalid result !",
      });
    }

    console.log("===> result=", result)

    
    result['userId'] = userId

    const isSavedResult = await new ResultModel(result)
    

    await isSavedResult
      .save()
      .then(() => {
        console.log("create a result successfully");
        res.json({
          success: true,
          message: "create a result successfully !",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(422).json({
          success: false,
          message: "error create a result",
        });
      });
  },

  delete: async (req, res) => {
    const _id = req.params._id
    
    await ResultModel.findByIdAndDelete(_id).then((data)=>{
      console.log('deleted result successfully ')
      res.json({
        success:true,
        message:"deleted successfully"
      })
    }).catch(error=>{
      console.log(error)
      res.status(422).json({
        success:false,
        message:"error delete result"
      })
    })

  }
};

module.exports = ResultController;
