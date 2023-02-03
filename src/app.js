const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerDocJS = require("swagger-jsdoc");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "Bienvenidos a CLR System API",
    documentación: `${process.env.API_URL}api-doc/`,
  });
});

//Documentación de la API
const swaggerSpec = require("./doc/swaggerSpec");
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocJS(swaggerSpec),{customSiteTitle:"CLR System API DOC"})
);

//EndPoints de la API
const clientRouter = require("./routers/cliente.router");
app.use("/clients", clientRouter);

module.exports = app;
