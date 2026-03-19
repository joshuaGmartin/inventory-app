const queries = require("../db/queries");

const validator = [];

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
  getAllDirectors,
  getAllDirectorsFilms,
};
