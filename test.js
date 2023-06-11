const questions = {
  question1: {
    questionText: "Hom nay la thu may ?",
    answers: {
      0: "thu 2",
      1: "thu 3",
      2: "thu 4",
      3: "thu 5",
    },
  },

  question2: {
    questionText: "Hom nay la thu may 2 ?",
    answers: {
      0: "thu 2",
      1: "thu 3",
      2: "thu 4",
      3: "thu 5",
    },
  },

  question3: {
    questionText: "Hom nay la thu may 3?",
    answers: {
      0: "thu 2",
      1: "thu 3",
      2: "thu 4",
      3: "thu 5",
    },
  },

  question4: {
    questionText: "Hom nay la thu may 4?",
    answers: {
      0: "thu 2",
      1: "thu 3",
      2: "thu 4",
      3: "thu 5",
    },
  },
};

// convert object to array
console.log(questions)

const results = Object.values(questions)
console.log(results)