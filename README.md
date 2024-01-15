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
A documentation of the endpoints can be found at `/swagger`.

## Auth

### POST /auth/login

This endpoint logs in a user.

**Request Body:**

A user object which includes:
- `email`: The email of the user.
- `password`: The password of the user.

**Response:**

A user object with tokens.

### POST /auth/register

This endpoint registers a new user.

**Request Body:**

A user object which includes:
- `name`: The name of the user.
- `email`: The email of the user.
- `password`: The password of the user.

**Response:**

A user object with tokens.

### POST /auth/refresh

This endpoint refreshes the access token.

**Request Body:**

An object which includes:
- `token`: The refresh token of the user.

**Response:**

New access and refresh tokens.

### GET /auth/me (auth only)

This endpoint retrieves the current user.

**Response:**

The user object.

### PATCH /auth/me (auth only)

This endpoint updates the current user.

**Request Body:**

A user object with the fields to be updated.

**Response:**

The updated user object.

## Users

### GET /users (admin only)

This endpoint retrieves a list of all users in the database.

**Response:**

An array of user objects.

### GET /users/:id

This endpoint retrieves a specific user by its ID.

**Path Parameters:**

- `id`: The unique identifier of the user.

**Response:**

The user object.

### PATCH /users/:id

This endpoint updates a specific user by its ID.

**Path Parameters:**

- `id`: The unique identifier of the user.

**Request Body:**

A user object with the fields to be updated.

**Response:**

The updated user object.

### DELETE /users/:id

This endpoint deletes a specific user by its ID.

**Path Parameters:**

- `id`: The unique identifier of the user.

**Response:**

A string message indicating the user was successfully deleted.

## Movies (auth only)

### GET /movies

This endpoint retrieves a list of all movies in the database.

**Response:**

An array of movie objects.

### POST /movies (admin only)

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

### PATCH /movies/:id (admin only)

This endpoint updates a specific movie by its ID.

**Path Parameters:**

- `id`: The unique identifier of the movie.

**Request Body:**

A movie object with the fields to be updated.

**Response:**

The updated movie object.

### DELETE /movies/:id (admin only)

This endpoint deletes a specific movie by its ID.

**Path Parameters:**

- `id`: The unique identifier of the movie.

**Response:**

A string message indicating the movie was successfully deleted.

## Return types

Accept xml or json as the return type by setting the `Accept` header to `application/xml` or `application/json` (by default).