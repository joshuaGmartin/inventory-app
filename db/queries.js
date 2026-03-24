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
    `SELECT *, films.id as film_id FROM films JOIN directors ON director_id = directors.id JOIN genres ON genre_id = genres.id ORDER BY ${sort} ${order}`,
  );

  return rows;
}

async function addFilm(
  filmTitleInput,
  releaseYearInput,
  directorInput,
  genreInput,
) {
  await pool.query(
    `INSERT INTO films (title, director_id, release_year, genre_id) VALUES
        ($1, $2, $3, $4)`,
    [filmTitleInput, directorInput, releaseYearInput, genreInput],
  );
}

async function searchFilms(searchTerm, sort, order) {
  // sanitize inputs

  if (sort) {
    const allowedSorts = ["title", "release_year", "dir_name", "genre_name"];
    if (!allowedSorts.includes(sort)) sort = "title";
  } else sort = "title";

  if (order) {
    const allowedOrders = ["asc", "desc"];
    if (!allowedOrders.includes(order.toLowerCase())) order = "asc";
  } else order = "asc";

  // include year search?
  const { rows } = await pool.query(
    `SELECT * FROM films JOIN directors ON director_id = directors.id JOIN genres ON genre_id = genres.id WHERE title ILIKE $1 OR release_year::text ILIKE $1 ORDER BY ${sort} ${order}`,
    [`%${searchTerm}%`],
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

async function addDirector(directorInput, educationInput, oscarsInput) {
  await pool.query(
    `INSERT INTO directors (dir_name, school, dir_oscars) VALUES
        ($1, $2, $3)`,
    [directorInput, educationInput, oscarsInput],
  );
}

async function searchDirectors(searchTerm, sort, order) {
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
    `SELECT * FROM directors WHERE dir_name ILIKE $1 OR school ILIKE $1 ORDER BY ${sort} ${order}`,
    [`%${searchTerm}%`],
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

async function addGenre(genreInput) {
  await pool.query(
    `INSERT INTO genres (genre_name) VALUES
        ($1)`,
    [genreInput],
  );
}

module.exports = {
  getAllFilms,
  addFilm,
  searchFilms,
  getAllDirectors,
  getAllDirectorFilms,
  addDirector,
  searchDirectors,
  getAllGenres,
  getAllGenreFilms,
  addGenre,
};
