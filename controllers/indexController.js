const query = require("../db/queries");

const validator = [];

async function getAllFilms(req, res) {
  query.getAllFilms();
  res.send("test");
}

module.exports = { getAllFilms };
