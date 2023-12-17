import { createZodDto } from "nestjs-zod"
import { MovieUpdateBodySchema } from "src/schemas/movie/schema"

export class UpdateMovieDto extends createZodDto(MovieUpdateBodySchema) {}
