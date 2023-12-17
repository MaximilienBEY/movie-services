# Web Service

## Description

A basic CRUD service for movies, using NestJS, Prisma and Sqlite.

## Installation

Install the dependencies:

```bash
pnpm install
```

Generate the database:

```bash
pnpm prisma db push
```

## Usage

Start the server:

```bash
pnpm run start
```

Or start the server in development mode:

```bash
pnpm run dev
```

## Endpoints

### GET /movies

This endpoint retrieves a list of all movies in the database.

**Response:**

An array of movie objects.

### POST /movies

This endpoint creates a new movie.

**Request Body:**

A movie object which includes:
- `title`: The title of the movie.
- `director`: The director of the movie.
- `releaseDate`: The release date of the movie.
- `categories`: An array of categories the movie belongs to (min 1).
- `rating`: The rating of the movie (optional).
- `poster`: The poster of the movie (file, optional).

**Response:**

The created movie object.

### GET /movies/:id

This endpoint retrieves a specific movie by its ID.

**Path Parameters:**

- `id`: The unique identifier of the movie.

**Response:**

The movie object.

### PATCH /movies/:id

This endpoint updates a specific movie by its ID.

**Path Parameters:**

- `id`: The unique identifier of the movie.

**Request Body:**

A movie object with the fields to be updated.

**Response:**

The updated movie object.

### DELETE /movies/:id

This endpoint deletes a specific movie by its ID.

**Path Parameters:**

- `id`: The unique identifier of the movie.

**Response:**

A string message indicating the movie was successfully deleted.

## Return types

Accept xml or json as the return type by setting the `Accept` header to `application/xml` or `application/json` (by default).