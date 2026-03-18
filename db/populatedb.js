/* 

drop table directors, films, genres;

*/

const { Client } = require("pg");
require("dotenv").config();

const SQL = ` 
    CREATE TABLE IF NOT EXISTS films (
        id SERIAL PRIMARY KEY,
        title TEXT,
        director_id INTEGER,
        release_year INTEGER,
        genre_id INTEGER
    );


    CREATE TABLE IF NOT EXISTS genres (
        id SERIAL PRIMARY KEY,
        genre_name TEXT 
    );

    CREATE TABLE IF NOT EXISTS directors (
        id SERIAL PRIMARY KEY,
        dir_name TEXT, 
        school TEXT,
        dir_oscars INTEGER 
    );


    INSERT INTO films (title, director_id, release_year, genre_id) VALUES
        ('The Godfather', 1, 1972, 1),
        ('Goodfellas', 2, 1990, 1),
        ('The Dark Knight', 3, 2008, 4),
        ('Pulp Fiction', 4, 1994, 1),
        ('Fight Club', 5, 1999, 2),
        ('Se7en', 5, 1995, 3),
        ('Inception', 3, 2010, 5),
        ('The Matrix', 6, 1999, 5),
        ('Interstellar', 3, 2014, 5),
        ('No Country for Old Men', 7, 2007, 3),
        ('The Wolf of Wall Street', 2, 2013, 2),
        ('Breaking Bad Movie: El Camino', 8, 2019, 2),
        ('Gladiator', 9, 2000, 4),
        ('The Shawshank Redemption', 10, 1994, 2),
        ('Forrest Gump', 11, 1994, 2),
        ('The Big Lebowski', 7, 1998, 6),
        ('Superbad', 12, 2007, 6),
        ('Harry Potter and the Sorcerer''s Stone', 13, 2001, 7),
        ('The Lord of the Rings: The Fellowship of the Ring', 14, 2001, 7),
        ('Mad Max: Fury Road', 15, 2015, 4),
        ('Casino', 2, 1995, 1),
        ('Heat', 16, 1995, 1),
        ('Scarface', 17, 1983, 1),
        ('The Departed', 2, 2006, 1),
        ('Zodiac', 5, 2007, 3),
        ('Gone Girl', 5, 2014, 3),
        ('Prisoners', 18, 2013, 3),
        ('Sicario', 18, 2015, 3),
        ('Blade Runner 2049', 18, 2017, 5),
        ('Arrival', 18, 2016, 5),
        ('Dune', 18, 2021, 5),
        ('The Prestige', 3, 2006, 2),
        ('Memento', 3, 2000, 3),
        ('Tenet', 3, 2020, 5),
        ('Django Unchained', 4, 2012, 4),
        ('Inglourious Basterds', 4, 2009, 4),
        ('Kill Bill: Vol. 1', 4, 2003, 4),
        ('Kill Bill: Vol. 2', 4, 2004, 4),
        ('Once Upon a Time in Hollywood', 4, 2019, 2),
        ('The Irishman', 2, 2019, 1),
        ('Shutter Island', 2, 2010, 3),
        ('Taxi Driver', 2, 1976, 2),
        ('Raging Bull', 2, 1980, 2),
        ('A Bronx Tale', 19, 1993, 1),
        ('American Gangster', 9, 2007, 1),
        ('Training Day', 20, 2001, 1),
        ('John Wick', 21, 2014, 4),
        ('John Wick: Chapter 2', 21, 2017, 4),
        ('John Wick: Chapter 3 – Parabellum', 21, 2019, 4),
        ('The Equalizer', 20, 2014, 4),
        ('Man on Fire', 22, 2004, 2),
        ('Top Gun', 22, 1986, 4),
        ('Top Gun: Maverick', 23, 2022, 4),
        ('Edge of Tomorrow', 24, 2014, 5),
        ('Oblivion', 23, 2013, 5),
        ('Ex Machina', 25, 2014, 5),
        ('Annihilation', 25, 2018, 5),
        ('Her', 26, 2013, 2),
        ('The Social Network', 5, 2010, 2),
        ('The Curious Case of Benjamin Button', 5, 2008, 2),
        ('Nightcrawler', 27, 2014, 3),
        ('Drive', 28, 2011, 1),
        ('Only God Forgives', 28, 2013, 2),
        ('The Nice Guys', 29, 2016, 1),
        ('Kiss Kiss Bang Bang', 29, 2005, 1),
        ('Step Brothers', 30, 2008, 6),
        ('Anchorman', 30, 2004, 6),
        ('Talladega Nights', 30, 2006, 6),
        ('Elf', 31, 2003, 6),
        ('The Hangover', 32, 2009, 6),
        ('Joker', 32, 2019, 2),
        ('Logan', 33, 2017, 4),
        ('Ford v Ferrari', 33, 2019, 2),
        ('The Wolverine', 33, 2013, 4),
        ('Glory', 34, 1989, 2),
        ('Blood Diamond', 34, 2006, 2),
        ('The Last Samurai', 34, 2003, 2),
        ('Braveheart', 35, 1995, 4),
        ('Apocalypto', 35, 2006, 4),
        ('300', 36, 2006, 4),
        ('Watchmen', 36, 2009, 5),
        ('Man of Steel', 36, 2013, 5),
        ('Justice League', 36, 2021, 5),
        ('Pan''s Labyrinth', 37, 2006, 7),
        ('The Shape of Water', 37, 2017, 7),
        ('Hellboy', 37, 2004, 7),
        ('Pacific Rim', 37, 2013, 5),
        ('Children of Men', 38, 2006, 5),
        ('Gravity', 38, 2013, 5),
        ('Roma', 38, 2018, 2),
        ('The Revenant', 39, 2015, 2),
        ('Birdman', 39, 2014, 2),
        ('Nope', 40, 2022, 3),
        ('Get Out', 40, 2017, 3),
        ('Us', 40, 2019, 3);


    INSERT INTO genres (genre_name) VALUES
        ('Crime'),
        ('Drama'),
        ('Thriller'),
        ('Action'),
        ('Sci-Fi'),
        ('Comedy'),
        ('Fantasy');


    INSERT INTO directors (dir_name, school, dir_oscars) VALUES
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
