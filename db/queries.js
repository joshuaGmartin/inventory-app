const pool = require("./pool");

async function getAllFilms(sort, order) {
  // sanitize inputs
  if (sort) {
    const allowedSorts = ["title", "release_year", "dir_name", "genre_name"];
    if (!allowedSorts.includes(sort)) sort = "title";
  } else sort = "title";

  if (order) {
    const allowedOrders = ["asc", "desc"];
    if (!allowedOrders.includes(order.toLowerCase())) order = "asc";
  } else order = "asc";

  const { rows } = await pool.query(
    `SELECT * FROM films JOIN directors ON director_id = directors.id JOIN genres ON genre_id = genres.id ORDER BY ${sort} ${order}`,
  );
  return rows;
}

module.exports = { getAllFilms };
