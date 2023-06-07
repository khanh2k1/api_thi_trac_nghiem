const ResultUtils = {
  calculateScore: (correctAnswers, userAnswers) => {
    let score = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (correctAnswers[i] === userAnswers[i]) {
        score++;
      }
    }

    return score;
  },
};

module.exports = ResultUtils;
