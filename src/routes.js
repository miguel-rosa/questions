const express = require("express");
require("dotenv-safe").config();

const { QuestionsController } = require("./controllers/questionsController");
const { UsersController } = require("./controllers/usersController");
const { TokenController } = require("./controllers/tokenController")

const routes = express.Router();

const usersController = new UsersController();
const questionsController = new QuestionsController();
const tokenController = new TokenController();

routes.get("/v1/users/", usersController.index);
routes.post("/v1/users/", usersController.create);
routes.get("/v1/auth/user", usersController.auth);

routes.get("/v1/questions", questionsController.index);
routes.get("/v1/question/:id", questionsController.show);
routes.get("/v1/questions/search", questionsController.search);
routes.post("/v1/questions", questionsController.create);

routes.post("/v1/auth/token", tokenController.create);
routes.get("/v1/auth/token/validate", tokenController.validate);

module.exports = routes;