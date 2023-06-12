const ExamModel = require("../model/Exam.model");
const ExamUtils = require("../utils/Exam.utils");
const ImageDefault = require("../variables/Image.variables");
const FileUtils = require("../utils/File.utils");
const ExamController = {
  // get all exam
  getAll: async (req, res) => {
    await ExamModel.find({ isPublic: true }).select('_id examId name description image')
      .then((data) => {
        console.log("get exams successfully");

        let exams = [];
        data.forEach((item) => {
          exams.push({
            _id: item._id,
            examId: item.examId,
            name: item.name,
            description: item.description,
            image: item.image,
          });

          console.log("=================================================");
        });

        res.json({
          success: true,
          message: "get exams successfully",
          exams,
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

    const {
      name,
      examId,
      questions,
      correctAnswers,
      totalTime,
      description,
      isPublic,
      createdBy,
    } = exam;
    const newExam = {
      _id,
      name,
      examId,
      questions,
      correctAnswers,
      totalTime,
      description,
      isPublic,
      createdBy,
    };
    res.json({
      success: true,
      message: newExam,
    });
  },

  // get a info exam
  getInfoExam: async (req, res) => {
    const examId = await req.body.examId;

    if (!examId) {
      return res.status(400).json({
        success: false,
        message: "invalid examId",
      });
    }

    await ExamModel.findOne({ examId })
      .then((data) => {
        const totalQuestions = data.questions.length;
        console.log(totalQuestions);
        const { name, description, totalTime, _id, image } = data;

        // Convert the buffer to a base64 string
        const base64StringImage = Buffer.from(image).toString("base64");

        const newExam = {
          _id,
          examId,
          name,
          description,
          totalTime,
          totalQuestions,
          image: base64StringImage,
        };
        res.json({
          success: true,
          message: newExam,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(422).json({
          success: false,
          message: err,
        });
      });
  },

  // get all exam which user created
  getCreatedBy: async (req, res) => {
    const createdBy = await req.user._id;
    console.log(createdBy);
    const exams = await ExamModel.find({ createdBy });
    res.json({
      success: true,
      exams,
    });
  },

  // get exam by examId
  getExamByExamId: async (req, res) => {
    const examId = req.params.examId;

    if (!examId) {
      return res.status(401).json({
        success: false,
        message: "invalid exam id",
      });
    }

    const exam = await ExamModel.findOne({ examId });
    if (!exam) {
      return res.status(404).json({
        success: falses,
        message: "not found exam",
      });
    }

    const {
      name,
      questions,
      correctAnswers,
      totalTime,
      description,
      isPublic,
    } = exam;
    const newExam = {
      _id,
      name,
      examId,
      questions,
      correctAnswers,
      totalTime,
      description,
      isPublic,
    };

    res.json({
      success: true,
      message: newExam,
    });
  },

  // create a exam
  create: async (req, res) => {

    console.log('req.body==> ',req.body)
    
    const exam = await req.body

    if (!req.file) {
      exam["image"] = ImageDefault;
      console.log("req.file not found");
    } else {
      exam["image"] = FileUtils.base64Image(req.file.buffer);
    }

    if(!exam) {
      console.error('new exam is invalid')
      return res.staus(422).json({
        success:false,
        message:'Invalid exam'
      })
    }

    // Xử lý hình ảnh theo nhu cầu của bạn
    exam["createdBy"] = req.user._id;
    exam["examId"] = ExamUtils.generateId();

    console.log(
      typeof exam["image"],
      typeof exam["totalTime"],
      typeof exam["name"],
      typeof exam['questions'],
      typeof exam['correctAnswers']
    );

    console.log('===>>>', exam)
    console.log("=============================================================")
    console.log('exams typeof =>>>: ', exam['questions'])
    console.log('exams[question] =>>>: ', JSON.parse(exam['questions']))
    console.log('correctAnswers typeof =>>>: ', exam['correctAnswers'])
    console.log('correctAnswers =>>>: ', JSON.parse(exam['correctAnswers']))
    console.log("=============================================================")
    console.log("=============================================================")
    console.log("=============================================================")

    exam['questions'] = JSON.parse(exam['questions'])
    exam['correctAnswers'] = JSON.parse(exam['correctAnswers'])

    const savedExam = await new ExamModel(exam)

    const isSaved = await savedExam.save()
    console.log("is saved : ", isSaved)

    if(!isSaved) {
      return res.status(422).json({
        success:false,
        message:"saved failure", err
      })
    }else {
      res.json({
        success:true,
        message:"saved successfully"
      })
    }
  },

  // update infor of exam
  update: async (req, res) => {
    const { _id } = req.params;
   
    

    const isExistedExam = await ExamModel.findOne({ _id });

    if (!isExistedExam) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }

    // convert string to json
    

    let {
      name,
      isPublic,
      description,
      totalTime,
      questions,
      correctAnswers,
    } = req.body;

    let image;

    if (!req.file) {
      image = imageBuffer;
      console.log('ko co req.file')
    } else {
      image = FileUtils.base64Image(req.file.buffer);
      console.log('co req.file')
    }

    console.log(req.body.correctAnswers);
    questions = await JSON.parse(questions)
    correctAnswers = await JSON.parse(correctAnswers)

    await ExamModel.findByIdAndUpdate(_id, {
      name,
      isPublic,
      description,
      totalTime,
      questions,
      correctAnswers,
      image,
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
    console.log(correctAnswers);
    const _id = req.params._id;
    const exam = await ExamModel.findById({ _id });
    if (!exam) {
      console.log("exam not found to update questions");
      return res.status(404).json({
        success: false,
        message: "exam not found to update questions",
      });
    }

    await ExamModel.findByIdAndUpdate(_id, {
      $set: { questions, correctAnswers },
    })
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
    const _id = req.params._id;
    await ExamModel.findOneAndDelete({ createdBy, _id })
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
