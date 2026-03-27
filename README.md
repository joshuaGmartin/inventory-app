# Inventory Application

A full-stack inventory management application built with Node.js, Express, and PostgreSQL. This project manages a collection of films, along with their associated directors and genres, using a relational database and server-rendered views.

The application supports full CRUD functionality, search, and table sorting, providing a structured interface for managing interconnected data.

## Live Demo

[inventory-app-1i4c.onrender.com](https://inventory-app-1i4c.onrender.com/)

## Project Overview

This application models an inventory system for films. Each film is associated with:

- A director
- A genre

Users can browse, search, and manage films, directors, and genres through a clean interface backed by a relational PostgreSQL database.

## Features

- View all films, directors, and genres
- View films by director
- View films by genre
- Create, update, and delete:
  - Films
  - Directors
  - Genres

- Search functionality for films and directors
- Sortable tables (client-side sorting)
- Relational data handling with joins
- Server-side validation and error handling

## Tech Stack

- Node.js
- Express
- PostgreSQL
- EJS (templating)
- pg (node-postgres)
- Vanilla JavaScript (for client-side interactivity)
- CSS

## Architecture

The project follows an MVC-style structure:

- **Controllers**
  - `filmsController.js`
  - `directorsController.js`
  - `genresController.js`
  - `indexController.js`

- **Routes**
  - `filmsRouter.js`
  - `directorsRouter.js`
  - `genresRouter.js`
  - `indexRouter.js`

- **Database Layer**
  - Centralized queries in `db/queries.js`
  - Connection pooling via `db/pool.js`

- **Views**
  - Organized by resource (films, directors, genres)
  - Reusable partials for headers, tables, and errors

## Database Schema

### Films

- id (Primary Key)
- title
- release_year
- director_id (Foreign Key)
- genre_id (Foreign Key)

### Directors

- id (Primary Key)
- name
- school
- number of oscars

### Genres

- id (Primary Key)
- name

### Relationships

- A film belongs to one director
- A film belongs to one genre
- A director can have many films
- A genre can have many films

## Key Implementation Details

- Uses parameterized SQL queries to prevent SQL injection
- Implements relational joins to display combined data (films + directors + genres)
- Separates query logic into a dedicated module (`queries.js`)
- Uses async/await for all database operations
- Client-side table sorting implemented in `public/js/tableSort.js`
- Event handling for UI interactions in `public/js/eventListeners.js`
- Search implemented via query parameters and SQL filtering

## Routes

### Index

- GET / → Render home page
- GET /reset → Reset database for demo purposes

### Films

- GET /films → List all films
- GET /films/add → Add film form
- POST /films/add → Create film
- GET /films/edit?film_id= → Edit film form
- POST /films/edit?film_id= → Update film
- POST /films/delete?film_id= → Delete film
- GET /films/search?searchTerm= → Search films

### Directors

- GET /directors → List all directors
- GET /directors/films?dir_name= → View films by director
- GET /directors/add → Add director
- POST /directors/add → Create director
- GET /directors/edit?director_id= → Edit director form
- POST /directors/edit?director_id= → Update director
- POST /directors/delete?director_id= → Delete director
- GET /directors/search?searchTerm= → Search directors

### Genres

- GET /genres → List all genres
- GET /genres/films?genre_name= → View films by genre
- GET /genres/add → Add genre
- POST /genres/add → Create genre
- GET /genres/edit?genre_id= → Edit genre form
- POST /genres/edit?genre_id= → Update genre
- POST /genres/delete?genre_id= → Delete genre

## Installation and Setup

1. Clone the repository

```
git clone https://github.com/joshuaGmartin/inventory-app
cd inventory-app
```

2. Install dependencies

```
npm install
```

3. Create a `.env` file

```
DATABASE_URL=your_database_url
```

4. Set up PostgreSQL database

- Create a new database
- Run your schema (tables for films, directors, genres)

5. Start the server

```
npm start
```

- Seed data via "Reset Database" button in homepage

Open in browser:

```
http://localhost:3000
```

## Design Decisions

- Structured around relational data (films, directors, genres)
- Centralized SQL queries for maintainability
- Server-rendered views for simplicity and performance
- Client-side enhancements (sorting, events) layered on top
- Separate routes and controllers for each entity

## Future Improvements

- Authentication and authorization for admin actions
- Pagination for large datasets
- Advanced filtering (multi-field search)
- REST API layer
- UI improvements and responsive design

## Skills Employed

- Designing and implementing relational database schemas
- Building a modular Express application using MVC principles
- Writing and organizing SQL queries for complex joins
- Handling search and sorting functionality
- Structuring scalable backend code
- Integrating client-side JavaScript with server-rendered apps

## Acknowledgements

- The Odin Project
