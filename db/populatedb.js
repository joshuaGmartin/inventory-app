/* 

drop table directors, films, genres;

*/

const { Client } = require("pg");
require("dotenv").config();

const SQL = ` 
    CREATE TABLE IF NOT EXISTS films (
        id SERIAL PRIMARY KEY,
        title TEXT,
        director_id TEXT,
        release_year INTEGER,
        genre_id TEXT
    );


    CREATE TABLE IF NOT EXISTS genres (
        id SERIAL PRIMARY KEY,
        name TEXT 
    );

    CREATE TABLE IF NOT EXISTS directors (
        id SERIAL PRIMARY KEY,
        name TEXT, 
        school TEXT,
        dir_oscars INTEGER 
    );


    INSERT INTO films (title, director_id, release_year, genre_id) VALUES
        ('The Godfather', 1, 1972, 'Crime'),
        ('Goodfellas', 2, 1990, 'Crime'),
        ('The Dark Knight', 3, 2008, 'Action'),
        ('Pulp Fiction', 4, 1994, 'Crime'),
        ('Fight Club', 5, 1999, 'Drama'),
        ('Se7en', 5, 1995, 'Thriller'),
        ('Inception', 3, 2010, 'Sci-Fi'),
        ('The Matrix', 6, 1999, 'Sci-Fi'),
        ('Interstellar', 3, 2014, 'Sci-Fi'),
        ('No Country for Old Men', 7, 2007, 'Thriller'),
        ('The Wolf of Wall Street', 2, 2013, 'Drama'),
        ('Breaking Bad Movie: El Camino', 8, 2019, 'Drama'),
        ('Gladiator', 9, 2000, 'Action'),
        ('The Shawshank Redemption', 10, 1994, 'Drama'),
        ('Forrest Gump', 11, 1994, 'Drama'),
        ('The Big Lebowski', 7, 1998, 'Comedy'),
        ('Superbad', 12, 2007, 'Comedy'),
        ('Harry Potter and the Sorcerer''s Stone', 13, 2001, 'Fantasy' ),
        (
        'The Lord of the Rings: The Fellowship of the Ring',
        14,
        2001,
        'Fantasy'
        ),
        ('Mad Max: Fury Road', 15, 2015, 'Action'),
        ('Casino', 2, 1995, 'Crime'),
        ('Heat', 16, 1995, 'Crime'),
        ('Scarface', 17, 1983, 'Crime'),
        ('The Departed', 2, 2006, 'Crime'),
        ('Zodiac', 5, 2007, 'Thriller'),
        ('Gone Girl', 5, 2014, 'Thriller'),
        ('Prisoners', 18, 2013, 'Thriller'),
        ('Sicario', 18, 2015, 'Thriller'),
        ('Blade Runner 2049', 18, 2017, 'Sci-Fi'),
        ('Arrival', 18, 2016, 'Sci-Fi'),
        ('Dune', 18, 2021, 'Sci-Fi'),
        ('The Prestige', 3, 2006, 'Drama'),
        ('Memento', 3, 2000, 'Thriller'),
        ('Tenet', 3, 2020, 'Sci-Fi'),
        ('Django Unchained', 4, 2012, 'Action'),
        ('Inglourious Basterds', 4, 2009, 'Action'),
        ('Kill Bill: Vol. 1', 4, 2003, 'Action'),
        ('Kill Bill: Vol. 2', 4, 2004, 'Action'),
        ('Once Upon a Time in Hollywood', 4, 2019, 'Drama'),
        ('The Irishman', 2, 2019, 'Crime'),
        ('Shutter Island', 2, 2010, 'Thriller'),
        ('Taxi Driver', 2, 1976, 'Drama'),
        ('Raging Bull', 2, 1980, 'Drama'),
        ('A Bronx Tale', 19, 1993, 'Crime'),
        ('American Gangster', 9, 2007, 'Crime'),
        ('Training Day', 20, 2001, 'Crime'),
        ('John Wick', 21, 2014, 'Action'),
        ('John Wick: Chapter 2', 21, 2017, 'Action'),
        ('John Wick: Chapter 3 – Parabellum', 21, 2019, 'Action'),
        ('The Equalizer', 20, 2014, 'Action'),
        ('Man on Fire', 22, 2004, 'Drama'),
        ('Top Gun', 22, 1986, 'Action'),
        ('Top Gun: Maverick', 23, 2022, 'Action'),
        ('Edge of Tomorrow', 24, 2014, 'Sci-Fi'),
        ('Oblivion', 23, 2013, 'Sci-Fi'),
        ('Ex Machina', 25, 2014, 'Sci-Fi'),
        ('Annihilation', 25, 2018, 'Sci-Fi'),
        ('Her', 26, 2013, 'Drama'),
        ('The Social Network', 5, 2010, 'Drama'),
        ('The Curious Case of Benjamin Button', 5, 2008, 'Drama'),
        ('Nightcrawler', 27, 2014, 'Thriller'),
        ('Drive', 28, 2011, 'Crime'),
        ('Only God Forgives', 28, 2013, 'Drama'),
        ('The Nice Guys', 29, 2016, 'Crime'),
        ('Kiss Kiss Bang Bang', 29, 2005, 'Crime'),
        ('Step Brothers', 30, 2008, 'Comedy'),
        ('Anchorman', 30, 2004, 'Comedy'),
        ('Talladega Nights', 30, 2006, 'Comedy'),
        ('Elf', 31, 2003, 'Comedy'),
        ('The Hangover', 32, 2009, 'Comedy'),
        ('Joker', 32, 2019, 'Drama'),
        ('Logan', 33, 2017, 'Action'),
        ('Ford v Ferrari', 33, 2019, 'Drama'),
        ('The Wolverine', 33, 2013, 'Action'),
        ('Glory', 34, 1989, 'Drama'),
        ('Blood Diamond', 34, 2006, 'Drama'),
        ('The Last Samurai', 34, 2003, 'Drama'),
        ('Braveheart', 35, 1995, 'Action'),
        ('Apocalypto', 35, 2006, 'Action'),
        ('300', 36, 2006, 'Action'),
        ('Watchmen', 36, 2009, 'Sci-Fi'),
        ('Man of Steel', 36, 2013, 'Sci-Fi'),
        ('Justice League', 36, 2021, 'Sci-Fi'),
        ('Pan''s Labyrinth', 37, 2006, 'Fantasy' ),
        ('The Shape of Water', 37, 2017, 'Fantasy'),
        ('Hellboy', 37, 2004, 'Fantasy'),
        ('Pacific Rim', 37, 2013, 'Sci-Fi'),
        ('Children of Men', 38, 2006, 'Sci-Fi'),
        ('Gravity', 38, 2013, 'Sci-Fi'),
        ('Roma', 38, 2018, 'Drama'),
        ('The Revenant', 39, 2015, 'Drama'),
        ('Birdman', 39, 2014, 'Drama'),
        ('Nope', 40, 2022, 'Thriller'),
        ('Get Out', 40, 2017, 'Thriller'),
        ('Us', 40, 2019, 'Thriller');


    INSERT INTO genres (name) VALUES
        ('Crime'),
        ('Drama'),
        ('Thriller'),
        ('Action'),
        ('Sci-Fi'),
        ('Comedy'),
        ('Fantasy');


    INSERT INTO directors (name, school, dir_oscars) VALUES
        ('Francis Ford Coppola', 'UCLA', 1),
        ('Martin Scorsese', 'NYU', 1),
        ('Christopher Nolan', 'University College London', 1),
        ('Quentin Tarantino', 'Self-taught', 0),
        ('David Fincher', 'Self-taught', 0),
        ('The Wachowskis', 'Self-taught', 0),
        ('Coen Brothers', 'NYU', 1),
        ('Vince Gilligan', 'NYU', 0),
        ('Ridley Scott', 'Royal College of Art', 0),
        ('Frank Darabont', 'Self-taught', 0),
        ('Robert Zemeckis', 'USC', 1),
        ('Greg Mottola', 'Carnegie Mellon', 0),
        ('Chris Columbus', 'NYU', 0),
        ('Peter Jackson', 'Self-taught', 1),
        ('George Miller', 'University of New South Wales', 0),
        ('Michael Mann', 'London Film School', 0),
        ('Brian De Palma', 'Columbia University', 0),
        ('Denis Villeneuve', 'Université du Québec à Montréal', 0),
        ('Robert De Niro', 'Self-taught', 0),
        ('Antoine Fuqua', 'Self-taught', 0),
        ('Chad Stahelski', 'Self-taught', 0),
        ('Tony Scott', 'Royal College of Art', 0),
        ('Joseph Kosinski', 'Columbia University', 0),
        ('Doug Liman', 'NYU', 0),
        ('Alex Garland', 'University of Manchester', 0),
        ('Spike Jonze', 'Self-taught', 0),
        ('Dan Gilroy', 'Dartmouth College', 0),
        ('Nicolas Winding Refn', 'Self-taught', 0),
        ('Shane Black', 'UCLA', 0),
        ('Adam McKay', 'Temple University', 0),
        ('Jon Favreau', 'Queens College', 0),
        ('Todd Phillips', 'NYU', 0),
        ('James Mangold', 'Columbia University', 0),
        ('Edward Zwick', 'Harvard University', 0),
        ('Mel Gibson', 'National Institute of Dramatic Art', 1),
        ('Zack Snyder', 'ArtCenter College of Design', 0),
        ('Guillermo del Toro', 'Self-taught', 1),
        ('Alfonso Cuarón', 'UNAM', 2),
        ('Alejandro González Iñárritu', 'Self-taught', 2),
        ('Jordan Peele', 'Self-taught', 0);
    `;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("end");
}

main();
