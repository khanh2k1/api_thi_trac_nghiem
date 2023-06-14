// const { string } = require("joi");
// const conn = require("./src/database/connect");
// const Exam = require("./src/model/Exam.model");

const { number } = require("joi");

// // conn.connectToMongo()

// function generateExams() {
//   let exams = [];
//   for (let i = 0; i < 2; i++) {
//     // 30 exams

//     // =====================================
//     const exam = {
//       // 20 questions
//       questions: () => {
//         let questions = [];
//         for (let j = 0; j < 20; j++) {
//           const question = {
//             questionText: `${j}+${j + 1} bằng mấy ?`,
//             answers: () => {
//               let answers = [];
//               for (let i = 0; i < 4; i++) {
//                 answers.push(String.valueOf(i));
//               }
//               return answers;
//             },
//           };

//           questions.push(question);
//         }
//         return questions;
//       },

//       // =====================================
//       correctAnswers: () => {
//         let correctAnswers = [];
//         for (let i = 0; i < 20; i++) {
//           correctAnswers.push(i);
//         }
//         return correctAnswers;
//       },
//       // =====================================
//       isPublic: true,
//       // =====================================
//       createdBy: "64872452847f3efadd07c151",
//     };

//     exams.push(exam);
//   }

//   return exams;
// }

// async function printExams() {
//   try {
//     const exams = await generateExams();
//     const questions = exams[0]["questions"];
//     const result = questions();
//     console.log(result);

//   } catch (error) {
//     console.error(error);
//   }
// }

// printExams();

function generateRandomNumbers() {
  let numbers = [];
  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    numbers.push(randomNumber.toString());
    
  }

  return numbers.toString().replaceAll(',','')

}


console.log(generateRandomNumbers());
