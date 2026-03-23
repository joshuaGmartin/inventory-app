const { Router } = require("express");
const filmsRouter = Router();
const filmsController = require("../controllers/filmsController");

filmsRouter.get("/", filmsController.getAllFilms);
filmsRouter.get("/add", filmsController.getAddFilm);
filmsRouter.post("/add", filmsController.postAddFilm);
filmsRouter.get("/search", filmsController.getSearchFilms);

module.exports = filmsRouter;
