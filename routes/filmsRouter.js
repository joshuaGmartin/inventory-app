const { Router } = require("express");
const filmsRouter = Router();
const filmsController = require("../controllers/filmsController");

filmsRouter.get("/", filmsController.getAllFilms);
filmsRouter.get("/add", filmsController.getAddFilm);
filmsRouter.post("/add", filmsController.postAddFilm);
filmsRouter.get("/search", filmsController.getSearchFilms);
filmsRouter.get("/edit", filmsController.getEditFilm);
filmsRouter.post("/edit", filmsController.postEditFilm);
filmsRouter.post("/delete", filmsController.postDeleteFilm);

module.exports = filmsRouter;
