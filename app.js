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
  console.log(err.sta);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) throw error;

  console.log("Listening on port:", PORT);
});

//test
let films = [
  ["The Godfather", "Francis Ford Coppola", 1972, 1],
  ["Goodfellas", "Martin Scorsese", 1990, 1],
  ["The Dark Knight", "Christopher Nolan", 2008, 4],
  ["Pulp Fiction", "Quentin Tarantino", 1994, 1],
  ["Fight Club", "David Fincher", 1999, 2],
  ["Se7en", "David Fincher", 1995, 3],
  ["Inception", "Christopher Nolan", 2010, 5],
  ["The Matrix", "The Wachowskis", 1999, 5],
  ["Interstellar", "Christopher Nolan", 2014, 5],
  ["No Country for Old Men", "Coen Brothers", 2007, 3],
  ["The Wolf of Wall Street", "Martin Scorsese", 2013, 2],
  ["Breaking Bad Movie: El Camino", "Vince Gilligan", 2019, 2],
  ["Gladiator", "Ridley Scott", 2000, 4],
  ["The Shawshank Redemption", "Frank Darabont", 1994, 2],
  ["Forrest Gump", "Robert Zemeckis", 1994, 2],
  ["The Big Lebowski", "Coen Brothers", 1998, 6],
  ["Superbad", "Greg Mottola", 2007, 6],
  ["Harry Potter and the Sorcerer''s Stone", "Chris Columbus", 2001, 7],
  [
    "The Lord of the Rings: The Fellowship of the Ring",
    "Peter Jackson",
    2001,
    7,
  ],
  ["Mad Max: Fury Road", "George Miller", 2015, 4],
  ["Casino", "Martin Scorsese", 1995, 1],
  ["Heat", "Michael Mann", 1995, 1],
  ["Scarface", "Brian De Palma", 1983, 1],
  ["The Departed", "Martin Scorsese", 2006, 1],
  ["Zodiac", "David Fincher", 2007, 3],
  ["Gone Girl", "David Fincher", 2014, 3],
  ["Prisoners", "Denis Villeneuve", 2013, 3],
  ["Sicario", "Denis Villeneuve", 2015, 3],
  ["Blade Runner 2049", "Denis Villeneuve", 2017, 5],
  ["Arrival", "Denis Villeneuve", 2016, 5],
  ["Dune", "Denis Villeneuve", 2021, 5],
  ["The Prestige", "Christopher Nolan", 2006, 2],
  ["Memento", "Christopher Nolan", 2000, 3],
  ["Tenet", "Christopher Nolan", 2020, 5],
  ["Django Unchained", "Quentin Tarantino", 2012, 4],
  ["Inglourious Basterds", "Quentin Tarantino", 2009, 4],
  ["Kill Bill: Vol. 1", "Quentin Tarantino", 2003, 4],
  ["Kill Bill: Vol. 2", "Quentin Tarantino", 2004, 4],
  ["Once Upon a Time in Hollywood", "Quentin Tarantino", 2019, 2],
  ["The Irishman", "Martin Scorsese", 2019, 1],
  ["Shutter Island", "Martin Scorsese", 2010, 3],
  ["Taxi Driver", "Martin Scorsese", 1976, 2],
  ["Raging Bull", "Martin Scorsese", 1980, 2],
  ["A Bronx Tale", "Robert De Niro", 1993, 1],
  ["American Gangster", "Ridley Scott", 2007, 1],
  ["Training Day", "Antoine Fuqua", 2001, 1],
  ["John Wick", "Chad Stahelski", 2014, 4],
  ["John Wick: Chapter 2", "Chad Stahelski", 2017, 4],
  ["John Wick: Chapter 3 – Parabellum", "Chad Stahelski", 2019, 4],
  ["The Equalizer", "Antoine Fuqua", 2014, 4],
  ["Man on Fire", "Tony Scott", 2004, 2],
  ["Top Gun", "Tony Scott", 1986, 4],
  ["Top Gun: Maverick", "Joseph Kosinski", 2022, 4],
  ["Edge of Tomorrow", "Doug Liman", 2014, 5],
  ["Oblivion", "Joseph Kosinski", 2013, 5],
  ["Ex Machina", "Alex Garland", 2014, 5],
  ["Annihilation", "Alex Garland", 2018, 5],
  ["Her", "Spike Jonze", 2013, 2],
  ["The Social Network", "David Fincher", 2010, 2],
  ["The Curious Case of Benjamin Button", "David Fincher", 2008, 2],
  ["Nightcrawler", "Dan Gilroy", 2014, 3],
  ["Drive", "Nicolas Winding Refn", 2011, 1],
  ["Only God Forgives", "Nicolas Winding Refn", 2013, 2],
  ["The Nice Guys", "Shane Black", 2016, 1],
  ["Kiss Kiss Bang Bang", "Shane Black", 2005, 1],
  ["Step Brothers", "Adam McKay", 2008, 6],
  ["Anchorman", "Adam McKay", 2004, 6],
  ["Talladega Nights", "Adam McKay", 2006, 6],
  ["Elf", "Jon Favreau", 2003, 6],
  ["The Hangover", "Todd Phillips", 2009, 6],
  ["Joker", "Todd Phillips", 2019, 2],
  ["Logan", "James Mangold", 2017, 4],
  ["Ford v Ferrari", "James Mangold", 2019, 2],
  ["The Wolverine", "James Mangold", 2013, 4],
  ["Glory", "Edward Zwick", 1989, 2],
  ["Blood Diamond", "Edward Zwick", 2006, 2],
  ["The Last Samurai", "Edward Zwick", 2003, 2],
  ["Braveheart", "Mel Gibson", 1995, 4],
  ["Apocalypto", "Mel Gibson", 2006, 4],
  ["300", "Zack Snyder", 2006, 4],
  ["Watchmen", "Zack Snyder", 2009, 5],
  ["Man of Steel", "Zack Snyder", 2013, 5],
  ["Justice League", "Zack Snyder", 2021, 5],
  ["Pan''s Labyrinth", "Guillermo del Toro", 2006, 7],
  ["The Shape of Water", "Guillermo del Toro", 2017, 7],
  ["Hellboy", "Guillermo del Toro", 2004, 7],
  ["Pacific Rim", "Guillermo del Toro", 2013, 5],
  ["Children of Men", "Alfonso Cuarón", 2006, 5],
  ["Gravity", "Alfonso Cuarón", 2013, 5],
  ["Roma", "Alfonso Cuarón", 2018, 2],
  ["The Revenant", "Alejandro González Iñárritu", 2015, 2],
  ["Birdman", "Alejandro González Iñárritu", 2014, 2],
  ["Nope", "Jordan Peele", 2022, 3],
  ["Get Out", "Jordan Peele", 2017, 3],
  ["Us", "Jordan Peele", 2019, 3],
];

const genres = [
  "Crime",
  "Drama",
  "Thriller",
  "Action",
  "Sci-Fi",
  "Comedy",
  "Fantasy",
];

films.forEach((film, index) => {
  const g_index = film[3];
  films[index][3] = genres[g_index - 1];
});

let directors = [
  ["Francis Ford Coppola", "UCLA", 1],
  ["Martin Scorsese", "NYU", 1],
  ["Christopher Nolan", "University College London", 1],
  ["Quentin Tarantino", "Self-taught", 0],
  ["David Fincher", "Self-taught", 0],
  ["The Wachowskis", "Self-taught", 0],
  ["Coen Brothers", "NYU", 1],
  ["Vince Gilligan", "NYU", 0],
  ["Ridley Scott", "Royal College of Art", 0],
  ["Frank Darabont", "Self-taught", 0],
  ["Robert Zemeckis", "USC", 1],
  ["Greg Mottola", "Carnegie Mellon", 0],
  ["Chris Columbus", "NYU", 0],
  ["Peter Jackson", "Self-taught", 1],
  ["George Miller", "University of New South Wales", 0],
  ["Michael Mann", "London Film School", 0],
  ["Brian De Palma", "Columbia University", 0],
  ["Denis Villeneuve", "Université du Québec à Montréal", 0],
  ["Robert De Niro", "Self-taught", 0],
  ["Antoine Fuqua", "Self-taught", 0],
  ["Chad Stahelski", "Self-taught", 0],
  ["Tony Scott", "Royal College of Art", 0],
  ["Joseph Kosinski", "Columbia University", 0],
  ["Doug Liman", "NYU", 0],
  ["Alex Garland", "University of Manchester", 0],
  ["Spike Jonze", "Self-taught", 0],
  ["Dan Gilroy", "Dartmouth College", 0],
  ["Nicolas Winding Refn", "Self-taught", 0],
  ["Shane Black", "UCLA", 0],
  ["Adam McKay", "Temple University", 0],
  ["Jon Favreau", "Queens College", 0],
  ["Todd Phillips", "NYU", 0],
  ["James Mangold", "Columbia University", 0],
  ["Edward Zwick", "Harvard University", 0],
  ["Mel Gibson", "National Institute of Dramatic Art", 1],
  ["Zack Snyder", "ArtCenter College of Design", 0],
  ["Guillermo del Toro", "Self-taught", 1],
  ["Alfonso Cuarón", "UNAM", 2],
  ["Alejandro González Iñárritu", "Self-taught", 2],
  ["Jordan Peele", "Self-taught", 0],
];

films.forEach((film) => {
  const f_dir = film[1];

  directors.forEach((dir, d_index) => {
    if (dir[0] === f_dir) {
      film[1] = d_index + 1;
    }
  });
});

// console.log(films);
