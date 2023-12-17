import { createZodDto } from "nestjs-zod"
import { MovieCreateBodySchema } from "src/schemas/movie/schema"

export class CreateMovieDto extends createZodDto(MovieCreateBodySchema) {}
