const { Router } = require("express");
const genresRouter = Router();
const genresController = require("../controllers/genresController");

genresRouter.get("/", genresController.getAllGenres);
genresRouter.get("/films", genresController.getAllGenreFilms);
genresRouter.get("/add", genresController.getAddGenre);
genresRouter.post("/add", genresController.postAddGenre);

module.exports = genresRouter;
