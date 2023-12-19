import { createZodDto } from "nestjs-zod"
import { loginSchema } from "src/schemas/auth/schema"

export class LoginDto extends createZodDto(loginSchema) {}
