const queries = require("../db/queries");
const {
  body,
  query,
  validationResult,
  matchedData,
} = require("express-validator");

const addFilmValidator = [
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

const searchFilmValidator = [
  query("searchTerm").trim().notEmpty().withMessage("Must include search term"),
];

async function getAllFilms(req, res) {
  const { sort, order } = req.query; // if undefined, fix in query sanitization
  const films = await queries.getAllFilms(sort, order);

  res.render("films/films", { films: films });
}

async function getAddFilm(req, res) {
  const genres = await queries.getAllGenres();
  const directors = await queries.getAllDirectors();
  const inputData = {};

  res.render("films/filmAdd", {
    genres: genres,
    directors: directors,
    inputData: inputData,
  });
}

const postAddFilm = [
  addFilmValidator,
  async function postAddFilm(req, res) {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      const genres = await queries.getAllGenres();
      const directors = await queries.getAllDirectors();
      const inputData = {
        filmTitleInput: req.body.filmTitleInput,
        releaseYearInput: req.body.releaseYearInput,
        directorInput: req.body.directorInput,
        genreInput: req.body.genreInput,
      };

      return res.status(400).render("films/filmAdd", {
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

const getSearchFilms = [
  searchFilmValidator,
  async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const films = await queries.getAllFilms();

      return res.render("films/films", {
        films: films,
        errors: errors.array(),
      });
    }

    const { sort, order } = req.query; // if undefined, fix in query sanitization
    const { searchTerm } = matchedData(req);

    const searchFilms = await queries.searchFilms(searchTerm, sort, order);

    res.render("films/searchFilms", {
      searchFilms: searchFilms,
      searchTerm: searchTerm,
    });
  },
];

async function getEditFilm(req, res) {
  const { film_id } = req.query;
  const genres = await queries.getAllGenres();
  const directors = await queries.getAllDirectors();
  const film = await queries.getEditFilm(film_id);
  const inputData = {}; // refactor data into here?

  res.render("films/editFilm", {
    film: film,
    inputFilmId: film_id,
    genres: genres,
    directors: directors,
    inputData: inputData,
  });
}

module.exports = {
  getAllFilms,
  getAddFilm,
  postAddFilm,
  getSearchFilms,
  getEditFilm,
};
