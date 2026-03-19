const { Router } = require("express");
const filmsRouter = Router();
const filmsController = require("../controllers/filmsController");

filmsRouter.get("/", filmsController.getAllFilms);

module.exports = filmsRouter;
