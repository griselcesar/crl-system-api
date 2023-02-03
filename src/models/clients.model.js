const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: { type: String, required: true },
  rif: { type: Number, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  create: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("client", clientSchema);
