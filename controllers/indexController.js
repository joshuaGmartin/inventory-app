const queries = require("../db/queries");

const validator = [];

function getIndex(req, res) {
  res.render("index");
}

async function getAllFilms(req, res) {
  const { sort, order } = req.query;
  const films = await queries.getAllFilms(sort, order);

  res.render("films", { films: films });
}

async function getAllDirectors(req, res) {
  const { sort, order } = req.query;
  const directors = await queries.getAllDirectors(sort, order);

  res.render("directors", { directors: directors });
}

async function getAllDirectorsFilms(req, res) {
  const { dir_name, sort, order } = req.query;
  const directorFilms = await queries.getAllDirectorsFilms(
    dir_name,
    sort,
    order,
  );

  res.render("directorFilms", {
    dir_name: dir_name,
    directorFilms: directorFilms,
  });
}

module.exports = {
  getIndex,
  getAllFilms,
  getAllDirectors,
  getAllDirectorsFilms,
};
