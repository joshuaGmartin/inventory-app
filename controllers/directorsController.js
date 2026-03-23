const queries = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validator = [
  body("directorInput").trim().notEmpty().withMessage("Must include name"),
  body("educationInput")
    .trim()
    .notEmpty()
    .withMessage(
      'Must include school (enter "Self-taught" if did not attend school)',
    ),
  body("oscarsInput")
    .trim()
    .notEmpty()
    .withMessage("Must include number of oscars")
    .isInt({ min: 0 })
    .withMessage("Cannot have negative oscars"),
];

async function getAllDirectors(req, res) {
  const { sort, order } = req.query;
  const directors = await queries.getAllDirectors(sort, order);

  res.render("directors/directors", { directors: directors });
}

async function getAllDirectorFilms(req, res) {
  const { dir_name, sort, order } = req.query;
  const directorFilms = await queries.getAllDirectorFilms(
    dir_name,
    sort,
    order,
  );

  res.render("directors/directorFilms", {
    dir_name: dir_name,
    directorFilms: directorFilms,
  });
}

async function getAddDirector(req, res) {
  const inputData = {};

  res.render("directors/directorAdd", {
    inputData: inputData,
  });
}

const postAddDirector = [
  validator,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const inputData = {
        directorInput: req.body.directorInput,
        educationInput: req.body.educationInput,
        oscarsInput: req.body.oscarsInput,
      };

      return res.status(400).render("directors/directorAdd", {
        inputData: inputData,
        errors: errors.array(),
      });
    }

    const { directorInput, educationInput, oscarsInput } = matchedData(req);
    await queries.addDirector(directorInput, educationInput, oscarsInput);

    res.redirect("/");
  },
];

module.exports = {
  getAllDirectors,
  getAllDirectorFilms,
  getAddDirector,
  postAddDirector,
};
