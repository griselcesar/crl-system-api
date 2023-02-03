const Router = require("express").Router();
const clientController = require("../controllers/clients.controller");

Router.route("/")
  .get(clientController.getAllClients)
  .post(clientController.createClient);
Router.route("/:id")
  .get(clientController.getOneClient)
  .patch(clientController.updateOneClient)
  .delete(clientController.deleteOneClient);
module.exports = Router;
