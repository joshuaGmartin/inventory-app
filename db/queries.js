const pool = require("./pool");

// ============================================================================================
// Films
// ============================================================================================

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

// ============================================================================================
// Directors
// ============================================================================================

async function getAllDirectors(sort, order) {
  // sanitize inputs
  if (sort) {
    const allowedSorts = ["dir_name", "school", "dir_oscars"];
    if (!allowedSorts.includes(sort)) sort = "dir_name";
  } else sort = "dir_name";

  if (order) {
    const allowedOrders = ["asc", "desc"];
    if (!allowedOrders.includes(order.toLowerCase())) order = "asc";
  } else order = "asc";

  const { rows } = await pool.query(
    `SELECT * FROM directors ORDER BY ${sort} ${order}`,
  );

  return rows;
}

async function getAllDirectorFilms(dir_name, sort, order) {
  // sanitize inputs
  if (sort) {
    const allowedSorts = ["title", "release_year", "genre_name"];
    if (!allowedSorts.includes(sort)) sort = "title";
  } else sort = "title";

  if (order) {
    const allowedOrders = ["asc", "desc"];
    if (!allowedOrders.includes(order.toLowerCase())) order = "asc";
  } else order = "asc";

  const { rows } = await pool.query(
    `SELECT * FROM films JOIN directors ON director_id = directors.id JOIN genres ON genre_id = genres.id WHERE dir_name = '${dir_name}' ORDER BY ${sort} ${order}`,
  );

  return rows;
}

// ============================================================================================
// Genres
// ============================================================================================

async function getAllGenres(sort, order) {
  // sanitize inputs
  if (sort) {
    const allowedSorts = ["genre_name"];
    if (!allowedSorts.includes(sort)) sort = "genre_name";
  } else sort = "genre_name";

  if (order) {
    const allowedOrders = ["asc", "desc"];
    if (!allowedOrders.includes(order.toLowerCase())) order = "asc";
  } else order = "asc";

  const { rows } = await pool.query(
    `SELECT * FROM genres ORDER BY ${sort} ${order}`,
  );

  return rows;
}

async function getAllGenreFilms(genre_name, sort, order) {
  // sanitize inputs
  if (sort) {
    const allowedSorts = ["title", "release_year", "dir_name"];
    if (!allowedSorts.includes(sort)) sort = "title";
  } else sort = "title";

  if (order) {
    const allowedOrders = ["asc", "desc"];
    if (!allowedOrders.includes(order.toLowerCase())) order = "asc";
  } else order = "asc";

  const { rows } = await pool.query(
    `SELECT * FROM films JOIN directors ON director_id = directors.id JOIN genres ON genre_id = genres.id WHERE genre_name = '${genre_name}' ORDER BY ${sort} ${order}`,
  );

  return rows;
}

module.exports = {
  getAllFilms,
  getAllDirectors,
  getAllDirectorFilms,
  getAllGenres,
  getAllGenreFilms,
};
