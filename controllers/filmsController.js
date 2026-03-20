const queries = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validator = [
  body("filmTitleInput")
    .trim()
    .notEmpty()
    .withMessage("Must include film title"),
  body("releaseYearInput")
    .trim()
    .notEmpty()
    .withMessage("Must include release year")
    .isInt({ max: new Date().getFullYear() })
    .withMessage("Release year cannot be in the future"),
  body("directorInput").trim().notEmpty().withMessage("Must include director"),
  body("genreInput").trim().notEmpty().withMessage("Must include genre"),
];

async function getAllFilms(req, res) {
  const { sort, order } = req.query;
  const films = await queries.getAllFilms(sort, order);

  res.render("films", { films: films });
}

async function getAddFilm(req, res) {
  const genres = await queries.getAllGenres();
  const directors = await queries.getAllDirectors();
  const inputData = {};

  res.render("filmAdd", {
    genres: genres,
    directors: directors,
    inputData: inputData,
  });
}

const postAddFilm = [
  validator,
  async function postAddFilm(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const genres = await queries.getAllGenres();
      const directors = await queries.getAllDirectors();
      const inputData = {
        filmTitleInput: req.body.filmTitleInput,
        releaseYearInput: req.body.releaseYearInput,
        directorInput: req.body.directorInput,
        genreInput: req.body.genreInput,
      };

      return res.status(400).render("filmAdd", {
        genres: genres,
        directors: directors,
        errors: errors.array(),
        inputData: inputData,
      });
    }

    const { filmTitleInput, releaseYearInput, directorInput, genreInput } =
      matchedData(req);

    await queries.addFilm(
      filmTitleInput,
      releaseYearInput,
      directorInput,
      genreInput,
    );

    res.redirect("/");
  },
];

module.exports = {
  getAllFilms,
  getAddFilm,
  postAddFilm,
};
