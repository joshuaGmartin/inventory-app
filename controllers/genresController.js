const queries = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validator = [
  body("genreInput").trim().notEmpty().withMessage("Must include genre"),
];

async function getAllGenres(req, res) {
  const { sort, order } = req.query;
  const genres = await queries.getAllGenres(sort, order);

  res.render("genres/genres", { genres: genres });
}

async function getAllGenreFilms(req, res) {
  const { genre_name, sort, order } = req.query;
  const genreFilms = await queries.getAllGenreFilms(genre_name, sort, order);

  res.render("genres/genreFilms", {
    genre_name: genre_name,
    genreFilms: genreFilms,
  });
}

async function getAddGenre(req, res) {
  const inputData = {};

  res.render("genres/genreAdd", {
    inputData: inputData,
  });
}

const postAddGenre = [
  validator,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const inputData = {
        genreInput: req.body.genreInput,
      };

      return res.status(400).render("genres/genreAdd", {
        inputData: inputData,
        errors: errors.array(),
      });
    }

    const { genreInput } = matchedData(req);
    await queries.addGenre(genreInput);

    res.redirect("/genres");
  },
];

async function getEditGenre(req, res) {
  const { genre_id } = req.query;

  const genre = await queries.getEditGenre(genre_id);
  const inputData = {}; // refactor data into here?

  res.render("genres/editGenre", {
    genre: genre,
    inputGenreId: genre_id,
    inputData: inputData,
  });
}

const postEditGenre = [
  validator,
  async (req, res) => {
    const errors = validationResult(req);
    const { genre_id } = req.query;

    if (!errors.isEmpty()) {
      const genre = {};
      const inputData = {
        genreInput: req.body.genreInput,
      };

      return res.render("genres/editGenre", {
        genre: genre,
        inputGenreId: genre_id,
        inputData: inputData,
        errors: errors.array(),
      });
    }

    const { genreInput } = matchedData(req);

    await queries.postEditGenre(genre_id, genreInput);

    res.redirect("/genres");
  },
];

async function postDeleteGenre(req, res) {
  await queries.postDeleteGenre(req.body.genre_id);
  res.redirect("/genres");
}

module.exports = {
  getAllGenres,
  getAllGenreFilms,
  getAddGenre,
  postAddGenre,
  getEditGenre,
  postEditGenre,
  postDeleteGenre,
};
