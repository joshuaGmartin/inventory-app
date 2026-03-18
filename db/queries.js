const pool = require("./pool");

const getAllFilms = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM directors");
  console.log(rows);
};

module.exports = { getAllFilms };
