const { Router } = require("express");
const genresRouter = Router();
const genresController = require("../controllers/genresController");

genresRouter.get("/", genresController.getAllGenres);
genresRouter.get("/films", genresController.getAllGenreFilms);

module.exports = genresRouter;
