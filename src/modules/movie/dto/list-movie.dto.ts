import { createZodDto } from "nestjs-zod"
import { MovieListQuerySchema } from "src/schemas/movie/schema"

export class ListMovieDto extends createZodDto(MovieListQuerySchema) {}
