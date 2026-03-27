const { Router } = require("express");
const directorsRouter = Router();
const directorsController = require("../controllers/directorsController");

directorsRouter.get("/", directorsController.getAllDirectors);
directorsRouter.get("/films", directorsController.getAllDirectorFilms);
directorsRouter.get("/add", directorsController.getAddDirector);
directorsRouter.post("/add", directorsController.postAddDirector);
directorsRouter.get("/search", directorsController.getSearchDirectors);
directorsRouter.get("/edit", directorsController.getEditDirector);
directorsRouter.post("/edit", directorsController.postEditDirector);
directorsRouter.post("/delete", directorsController.postDeleteDirector);

module.exports = directorsRouter;
