const { error } = require("../schemas/Image.schema");

const ExamUtils = {
  generateId: () => {
    let result = "";
    const characters = "0123456789";
    const timestamp = Date.now().toString();

    for (let i = 0; i < 10; i++) {
      const randomChar = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      result += randomChar;
    }

    return timestamp + result;
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
