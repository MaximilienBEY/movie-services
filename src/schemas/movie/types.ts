import { z } from "zod"

import {
  MovieCreateBodySchema,
  MovieListQuerySchema,
  MovieListResponseSchema,
  MovieSchema,
  MovieUpdateBodySchema,
} from "./schema"

export type MovieType = z.infer<typeof MovieSchema>

// List movies request
export type MovieListQueryType = z.infer<typeof MovieListQuerySchema>
export type MovieListResponseType = z.infer<typeof MovieListResponseSchema>

// Create movie request
export type MovieCreateBodyType = z.infer<typeof MovieCreateBodySchema>

// Update movie request
export type MovieUpdateBodyType = z.infer<typeof MovieUpdateBodySchema>
