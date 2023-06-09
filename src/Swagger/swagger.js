const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Địa chỉ máy chủ của ứng dụng của bạn
      },
    ],
  },
  apis: ['./routes/*.js'], // Đường dẫn đến các file chứa các routes/APIs của bạn
};

const specs = swaggerJsDoc(options);

module.exports = specs;
