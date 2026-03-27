const populatedb = require("../db/populatedb");

function getIndex(req, res) {
  res.render("index");
}

async function postResetData(req, res) {
  await populatedb.resetData();
  res.redirect("/");
}

module.exports = {
  getIndex,
  postResetData,
};
