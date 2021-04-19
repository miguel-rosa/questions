const express = require("express");

const { UsersController } = require("./controllers/usersController");

const routes = express.Router();

const usersController = new UsersController();

routes.get("/v1/users/", usersController.index);

module.exports = routes;