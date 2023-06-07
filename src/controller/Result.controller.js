const ResultModel = require("../model/Result.model");
const IsObjectId = require("../validators/ObjectId.validator");
const ResultUtils = require("../utils/Result.utils");

const ResultController = {
  getAll: async (req, res) => {
    const results = await ResultModel.find();

    try {
      // get correctAnswers and userAnswers
      let results_2 = [];
      results.forEach((item) => {
        const { correctAnswers, examId, name } = item["exam"];
        const { userAnswers } = item;
        console.log(correctAnswers, userAnswers);

        const score = ResultUtils.calculateScore(correctAnswers, userAnswers);
        const object = { score, examId, name };

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
    // const result = await ResultModel.findById(_id)
    // if(!result) {
    //   return res.status(404).json({
    //     success:false,
    //     message: "result not found !"
    //   })
    // }

    await ResultModel.findById({_id})
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
    let result = await ResultModel(req.body);
    result["userId"] = req.user._id;

    console.log(result["userId"]);

    await result
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
};

module.exports = ResultController;
