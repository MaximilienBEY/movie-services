import { createZodDto } from "nestjs-zod"
import { updateMeSchema } from "src/schemas/auth/schema"

export class UpdateMeDto extends createZodDto(updateMeSchema) {}
