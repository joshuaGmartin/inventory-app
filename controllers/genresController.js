const queries = require("../db/queries");

const validator = [];

async function getAllGenres(req, res) {
  const { sort, order } = req.query;
  const genres = await queries.getAllGenres(sort, order);

  res.render("genres", { genres: genres });
}

async function getAllGenreFilms(req, res) {
  const { genre_name, sort, order } = req.query;
  const genreFilms = await queries.getAllGenreFilms(genre_name, sort, order);

  res.render("genreFilms", {
    genre_name: genre_name,
    genreFilms: genreFilms,
  });
}

module.exports = {
  getAllGenres,
  getAllGenreFilms,
};
