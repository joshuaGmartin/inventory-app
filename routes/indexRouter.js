const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getIndex);
indexRouter.get("/films", indexController.getAllFilms);
indexRouter.get("/directors", indexController.getAllDirectors);
indexRouter.get("/directors/films", indexController.getAllDirectorsFilms);

module.exports = indexRouter;
