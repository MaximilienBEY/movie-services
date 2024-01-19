import { createZodDto } from "nestjs-zod"
import { movieUpdateSchema } from "src/schemas/movie/schema"

export class UpdateMovieDto extends createZodDto(movieUpdateSchema) {}
