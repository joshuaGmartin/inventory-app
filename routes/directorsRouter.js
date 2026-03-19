const { Router } = require("express");
const directorsRouter = Router();
const directorsController = require("../controllers/directorsController");

directorsRouter.get("/", directorsController.getAllDirectors);
directorsRouter.get("/films", directorsController.getAllDirectorsFilms);

module.exports = directorsRouter;
