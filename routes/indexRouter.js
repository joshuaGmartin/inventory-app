const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getIndex);
indexRouter.get("/films", indexController.getAllFilms);

module.exports = indexRouter;
