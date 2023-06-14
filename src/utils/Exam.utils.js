const { error } = require("../schemas/Image.schema");

const ExamUtils = {
  generateId: () => {
    let numbers = [];
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 9) + 1;
      numbers.push(randomNumber.toString());
    }

    return numbers.toString().replaceAll(",", "");
  },

  parseStringToArrayNumber: (data) => {
    try {
      const objects = JSON.parse(data);
      return objects.map((item) => Number(item));
    } catch (error) {
      console.error(error);
    }
  },
  parseStringToArrayObject: (data) => {
    try {
      const objects = JSON.parse(data);
      return objects.map((item) => Object(item));
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = ExamUtils;
