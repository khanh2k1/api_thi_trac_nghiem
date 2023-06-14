const { error } = require("../schemas/Image.schema");

const ExamUtils = {
  generateId: () => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
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
