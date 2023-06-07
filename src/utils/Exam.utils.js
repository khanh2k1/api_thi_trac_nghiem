const ExamUtils = {
  generateId: () => {
    let result = "";
    const characters =
      "0123456789";
    const timestamp = Date.now().toString();

    for (let i = 0; i < 10; i++) {
      const randomChar = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      result += randomChar;
    }

    return timestamp + result;
  },

  
};

module.exports = ExamUtils;
