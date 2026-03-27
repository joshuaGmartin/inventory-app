const { Router } = require("express");
const genresRouter = Router();
const genresController = require("../controllers/genresController");

genresRouter.get("/", genresController.getAllGenres);
genresRouter.get("/films", genresController.getAllGenreFilms);
genresRouter.get("/add", genresController.getAddGenre);
genresRouter.post("/add", genresController.postAddGenre);
genresRouter.get("/edit", genresController.getEditGenre);
genresRouter.post("/edit", genresController.postEditGenre);
genresRouter.post("/delete", genresController.postDeleteGenre);

module.exports = genresRouter;
