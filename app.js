const express = require("express");
const app = express();
const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/indexRouter");
const { getAllFilms } = require("./controllers/indexController");

app.use("/", indexRouter);

// 404
app.use((req, res) => {
  res.status(404).send("Page does not exist");
});

// errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) throw error;

  console.log("Listening on port:", PORT);
});
