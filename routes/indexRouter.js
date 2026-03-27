const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getIndex);
indexRouter.post("/reset", indexController.postResetData);

module.exports = indexRouter;
