import { createZodDto } from "nestjs-zod"
import { registerSchema } from "src/schemas/auth/schema"

export class RegisterDto extends createZodDto(registerSchema) {}
