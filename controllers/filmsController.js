const queries = require("../db/queries");

const validator = [];

async function getAllFilms(req, res) {
  const { sort, order } = req.query;
  const films = await queries.getAllFilms(sort, order);

  res.render("films", { films: films });
}

module.exports = {
  getAllFilms,
};
