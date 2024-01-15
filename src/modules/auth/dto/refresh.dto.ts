import { createZodDto } from "nestjs-zod"
import { refreshSchema } from "src/schemas/auth/schema"

export class RefreshDto extends createZodDto(refreshSchema) {}
