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

module.exports = { getIndex, getAllFilms };
