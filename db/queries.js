const pool = require("./pool");

const getAllFilms = async (req, res) => {
  const { rows } = await pool.query(
    "SELECT title, release_year, dir_name, genre_name FROM films JOIN directors ON director_id = directors.id JOIN genres ON genre_id = genres.id",
  );
  console.log(rows);
};

module.exports = { getAllFilms };
