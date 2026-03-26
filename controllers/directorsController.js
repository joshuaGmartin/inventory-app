const queries = require("../db/queries");
const {
  body,
  query,
  validationResult,
  matchedData,
} = require("express-validator");

const addEditDirectorValidator = [
  body("directorInput").trim().notEmpty().withMessage("Must include name"),
  body("educationInput")
    .trim()
    .notEmpty()
    .withMessage(
      'Must include school (enter "Self-taught" if did not attend school)',
    ),
  body("oscarsInput")
    .trim()
    .notEmpty()
    .withMessage("Must include number of oscars")
    .isInt({ min: 0 })
    .withMessage("Cannot have negative oscars"),
];

const searchDirectorValidator = [
  query("searchTerm").trim().notEmpty().withMessage("Must include search term"),
];

async function getAllDirectors(req, res) {
  const { sort, order } = req.query; // if undefined, fix in query sanitization
  const directors = await queries.getAllDirectors(sort, order);

  res.render("directors/directors", { directors: directors });
}

async function getAllDirectorFilms(req, res) {
  const { dir_name, sort, order } = req.query; // if undefined, fix in query sanitization
  const directorFilms = await queries.getAllDirectorFilms(
    dir_name,
    sort,
    order,
  );

  res.render("directors/directorFilms", {
    dir_name: dir_name,
    directorFilms: directorFilms,
  });
}

async function getAddDirector(req, res) {
  const inputData = {};

  res.render("directors/directorAdd", {
    inputData: inputData,
  });
}

const postAddDirector = [
  addEditDirectorValidator,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const inputData = {
        directorInput: req.body.directorInput,
        educationInput: req.body.educationInput,
        oscarsInput: req.body.oscarsInput,
      };

      return res.status(400).render("directors/directorAdd", {
        inputData: inputData,
        errors: errors.array(),
      });
    }

    const { directorInput, educationInput, oscarsInput } = matchedData(req);
    await queries.addDirector(directorInput, educationInput, oscarsInput);

    res.redirect("/");
  },
];

const getSearchDirectors = [
  searchDirectorValidator,
  async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const directors = await queries.getAllDirectors();

      return res.render("directors/directors", {
        directors: directors,
        errors: errors.array(),
      });
    }

    const { sort, order } = req.query; // if undefined, fix in query sanitization
    const { searchTerm } = matchedData(req);

    const searchDirectors = await queries.searchDirectors(
      searchTerm,
      sort,
      order,
    );

    res.render("directors/searchDirectors", {
      searchDirectors: searchDirectors,
      searchTerm: searchTerm,
    });
  },
];

async function getEditDirector(req, res) {
  const { director_id } = req.query;

  const director = await queries.getEditDirector(director_id);
  const inputData = {}; // refactor data into here?

  res.render("directors/editDirector", {
    director: director,
    inputDirectorId: director_id,
    inputData: inputData,
  });
}

const postEditDirector = [
  addEditDirectorValidator,
  async (req, res) => {
    const errors = validationResult(req);
    const { director_id } = req.query;

    console.log(director_id);

    if (!errors.isEmpty()) {
      const director = {};
      const inputData = {
        directorInput: req.body.directorInput,
        educationInput: req.body.educationInput,
        oscarsInput: req.body.oscarsInput,
      };

      return res.render("directors/editDirector", {
        director: director,
        inputDirectorId: director_id,
        inputData: inputData,
        errors: errors.array(),
      });
    }

    // const { filmTitleInput, releaseYearInput, directorInput, genreInput } =
    //   matchedData(req);

    // await queries.editFilm(
    //   film_id,
    //   filmTitleInput,
    //   releaseYearInput,
    //   directorInput,
    //   genreInput,
    // );

    // res.redirect("/films");
  },
];

// async function postDeleteFilm(req, res) {
//   await queries.postDeleteFilm(req.body.film_id);

//   res.redirect("/films");
// }

module.exports = {
  getAllDirectors,
  getAllDirectorFilms,
  getAddDirector,
  postAddDirector,
  getSearchDirectors,
  getEditDirector,
  postEditDirector,
};
