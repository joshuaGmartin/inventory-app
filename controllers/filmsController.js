const queries = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validator = [
  body("filmTitleInput").trim(),
  body("releaseYearInput")
    .isInt({ max: new Date().getFullYear() })
    .withMessage("Release year cannot be in the future"),
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
    const inputData = {
      filmTitleInput: req.body.filmTitleInput,
      releaseYearInput: req.body.releaseYearInput,
      directorInput: req.body.directorInput,
      genreInput: req.body.genreInput,
    };

    if (!errors.isEmpty()) {
      const genres = await queries.getAllGenres();
      const directors = await queries.getAllDirectors();

      res.status(400).render("filmAdd", {
        genres: genres,
        directors: directors,
        errors: errors.array(),
        inputData: inputData,
      });
    }

    // res.redirect("/");
  },
];

module.exports = {
  getAllFilms,
  getAddFilm,
  postAddFilm,
};
