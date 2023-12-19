import { createZodDto } from "nestjs-zod"
import { movieListQuerySchema } from "src/schemas/movie/schema"

export class ListMovieDto extends createZodDto(movieListQuerySchema) {}
