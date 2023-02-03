const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "CLR SYSTEM API",
    description: "API REST para administración de la empresa CLR Technology",
    version: "0.1.0",
    contact: {
      name: "César Grisel",
      email: "griselcesar@gmail.com",
      url: "http://www.griselcesar.com.ve",
    },
  },
  servers: [
    {
      url: process.env.API_URL,
      description: "Production Server",
    },
  ],
  components: {
    schemas: {
      Clients: {
        type: "object",
        required: ["email", "name", "rif", "phone", "address"],
        properties: {
          name: {
            type: "string",
            example: "Jho Doe",
          },
          rif: {
            type: "number",
            format: "int32",
            example: 12345678,
          },
          address: {
            type: "string",
            example: "New York street 4",
          },
          phone: {
            type: "string",
            example: "+58426.000.00.00",
          },
          email: {
            type: "string",
            example: "jdoe@mail.com",
          },
        },
      },
    },
    tags: [
      {
        name: "Clients",
        description: "Operations about Clients",
      },
    ],
  },
  paths: {
    "/clients": {
      get: {
        tags: ["Clients"],
        summary: "get all clients",
        description: "endpoint return all clients",
        operationId: "getAllClients",
      },
      post: {
        tags: ["Clients"],
        summary: "create a new client",
        description: "endpoint for create new client",
      },
    },
    "/clients/{ClientId}": {
      get: {
        tags: ["Clients"],
        summary: "get a client by ClientId",
      },
      patch: {
        tags: ["Clients"],
        summary: "update a client by ClientId",
      },
      delete: {
        tags: ["Clients"],
        summary: "delete a client by ClientId",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routers/*.js"],
};

module.exports = options;
