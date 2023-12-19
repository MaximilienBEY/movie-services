import { createZodDto } from "nestjs-zod"
import { movieCreateSchema } from "src/schemas/movie/schema"

export class CreateMovieDto extends createZodDto(movieCreateSchema) {}
