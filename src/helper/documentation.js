const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "quiz-app-nodejs",
    version: "0.0.1",
    description: "list api for quiz-app",
  },

  servers: [
    {
      url: "http://localhost:8080/v1/",
      description: "local dev",
    },

    {
      url: "https://quiz-app-nodejs.onrender.com/v1/",
      description: "product dev",
    },
  ],

  tags: [
    {
      name: "authentication",
      description: "all about authentication",
    },

    {
      name: "user",
      description: "all about user",
    },

    {
      name: "exam",
      description: "all about exam",
    },
    
    {
      name: "result",
      description: "all about result",
    },
  ],

  paths: {

    "/register" : {
      post: {
        tags: ["authentication"],
        summary: "register a new user"
      }
    },
    
    "/login" : {
      post: {
        tags: ["authentication"],
        summary: "login"
      }
    },

    "/refresh" : {
      post: {
        tags: ["authentication"],
        summary: "refresh token for authentication"
      }
    },

    "/exam/{id}": {
      patch: {
        tags: ["exam"],
        summary: "Update exam which is created by user",
      },

      get: {
        tags: ["exam"],
        summary: "get exam by exam id",
      },

      delete: {
        tags: ["exam"],
        summary: "delete exam by exam id",
      },
    },

    "/exam": {
      get: {
        tags: ["exam"],
        summary: "get all exam that user has created",
      },

      post: {
        tags: ["exam"],
        summary: "create a new exam",
      },
    },

    "/exam/info-exam": {
      get: {
        tags: ["exam"],
        summary: "get info exam by examId which is generated upside server",
      },
    },

    "/exam/all": {
      get: {
        tags: ["exam"],
        summary: "get all exams is public",
      },
    },

    // ================================================================

    "/user": {
      get: {
        tags: ["user"],
        summary: "get profile of user",
      },
      patch: {
        tags: ["user"],
        summary: "update password of user",
      },
    },

    "/user/update": {
      patch: {
        tags: ["user"],
        summary: "update image, firstname, lastname of user",
      },
    },

    // ================================================================

    "/result": {
      get: {
        tags: ["result"],
        summary: "get all result that user has done"
      },

      post: {
        tags: ["result"],
        summary: "create a result of user when user has done exam"
      }
    },

    "/result/{id}": {
      get: {
        tags: ["result"],
        summary: "get all result that user has done"
      },

      delete: {
        tags: ["result"],
        summary: "delete result by id result of user"
      }
    }
  },
};

module.exports = swaggerDocumentation;
