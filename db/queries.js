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

  const sortFormatted = sort === "release_year" ? sort : `LOWER(${sort})`;

  const { rows } = await pool.query(
    `SELECT *, films.id as film_id FROM films JOIN directors ON director_id = directors.id JOIN genres ON genre_id = genres.id ORDER BY ${sortFormatted} ${order}`,
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

  const sortFormatted = sort === "release_year" ? sort : `LOWER(${sort})`;

  // include year search?
  const { rows } = await pool.query(
    `SELECT *, films.id as film_id FROM films JOIN directors ON director_id = directors.id JOIN genres ON genre_id = genres.id WHERE title ILIKE $1 OR release_year::text ILIKE $1 ORDER BY ${sortFormatted} ${order}`,
    [`%${searchTerm}%`],
  );

  return rows;
}

async function getEditFilm(film_id) {
  // no non ints
  if (!Number.isInteger(Number(film_id))) return undefined;

  const { rows } = await pool.query(
    `SELECT *, films.id as film_id FROM films JOIN directors ON director_id = directors.id JOIN genres ON genre_id = genres.id WHERE films.id = $1`,
    [film_id],
  );

  return rows[0];
}

async function postEditFilm(
  film_id,
  filmTitleInput,
  releaseYearInput,
  directorInput,
  genreInput,
) {
  await pool.query(
    `
    UPDATE films 
    SET title = $1,
        release_year = $2,
        director_id = $3,
        genre_id = $4
    WHERE id = $5
    `,
    [filmTitleInput, releaseYearInput, directorInput, genreInput, film_id],
  );
}

async function postDeleteFilm(film_id) {
  await pool.query(`DELETE FROM films where id = $1`, [film_id]);
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

  const sortFormatted = sort === "dir_oscars" ? sort : `LOWER(${sort})`;

  const { rows } = await pool.query(
    `SELECT * FROM directors ORDER BY ${sortFormatted} ${order}`,
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

  const sortFormatted = sort === "release_year" ? sort : `LOWER(${sort})`;

  const { rows } = await pool.query(
    `SELECT *, films.id as film_id FROM films JOIN directors ON director_id = directors.id JOIN genres ON genre_id = genres.id WHERE dir_name = '${dir_name}' ORDER BY ${sortFormatted} ${order}`,
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

  const sortFormatted = sort === "dir_oscars" ? sort : `LOWER(${sort})`;

  const { rows } = await pool.query(
    `SELECT * FROM directors WHERE dir_name ILIKE $1 OR school ILIKE $1 ORDER BY ${sortFormatted} ${order}`,
    [`%${searchTerm}%`],
  );

  return rows;
}

async function getEditDirector(director_id) {
  // no non ints
  if (!Number.isInteger(Number(director_id))) return undefined;

  const { rows } = await pool.query(`SELECT * FROM directors WHERE id = $1`, [
    director_id,
  ]);

  return rows[0];
}

async function postEditDirector(
  director_id,
  directorInput,
  educationInput,
  oscarsInput,
) {
  await pool.query(
    `
    UPDATE directors
    SET dir_name = $1,
        school = $2,
        dir_oscars = $3
    WHERE id = $4
    `,
    [directorInput, educationInput, oscarsInput, director_id],
  );
}

async function postDeleteDirector(director_id) {
  await pool.query(`DELETE FROM films WHERE director_id = $1`, [director_id]);
  await pool.query(`DELETE FROM directors WHERE id = $1`, [director_id]);
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
    `SELECT * FROM genres ORDER BY LOWER(${sort}) ${order}`,
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

  const sortFormatted = sort === "release_year" ? sort : `LOWER(${sort})`;

  const { rows } = await pool.query(
    `SELECT *, films.id as film_id FROM films JOIN directors ON director_id = directors.id JOIN genres ON genre_id = genres.id WHERE genre_name = '${genre_name}' ORDER BY ${sortFormatted} ${order}`,
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

async function getEditGenre(genre_id) {
  // no non ints
  if (!Number.isInteger(Number(genre_id))) return undefined;

  const { rows } = await pool.query(`SELECT * FROM genres WHERE id = $1`, [
    genre_id,
  ]);

  return rows[0];
}

async function postEditGenre(genre_id, genreInput) {
  await pool.query(
    `
    UPDATE genres 
    SET genre_name = $1
    WHERE id = $2
    `,
    [genreInput, genre_id],
  );
}

async function postDeleteGenre(genre_id) {
  await pool.query(`DELETE FROM films WHERE genre_id = $1`, [genre_id]);
  await pool.query(`DELETE FROM directors WHERE id = $1`, [genre_id]);
}

module.exports = {
  //films
  getAllFilms,
  addFilm,
  searchFilms,
  getEditFilm,
  postEditFilm,
  postDeleteFilm,

  //directors
  getAllDirectors,
  getAllDirectorFilms,
  addDirector,
  searchDirectors,
  getEditDirector,
  postEditDirector,
  postDeleteDirector,

  //genres
  getAllGenres,
  getAllGenreFilms,
  addGenre,
  getEditGenre,
  postEditGenre,
  postDeleteGenre,
};
