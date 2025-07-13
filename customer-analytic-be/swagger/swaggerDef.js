const swaggerJSDoc = require("swagger-jsdoc");
//Swagger Docs Initialization
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Customer Analytics API",
      version: "1.0.0",
      description: "API for customer analytics dashboard",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://your-production-api.com",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        Customer: {
          type: "object",
          properties: {
            number: { type: "number" },
            locationName: { type: "string" },
            date: { type: "string", format: "date" },
            loginHour: { type: "string" },
            name: { type: "string" },
            age: { type: "number" },
            gender: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            brand: { type: "string" },
            interest: { type: "string" },
            locationType: { type: "string" },
          },
        },
        StatItem: {
          type: "object",
          properties: {
            _id: { type: "string" },
            count: { type: "number" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
