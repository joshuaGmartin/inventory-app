const { Router } = require("express");
const directorsRouter = Router();
const directorsController = require("../controllers/directorsController");

directorsRouter.get("/", directorsController.getAllDirectors);
directorsRouter.get("/films", directorsController.getAllDirectorFilms);

module.exports = directorsRouter;
