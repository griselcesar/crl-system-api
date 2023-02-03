const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🆗-->conectamos con la Base de Datos");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 API corriendo en: ${process.env.API_URL}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
