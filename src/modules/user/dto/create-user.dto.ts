import { createZodDto } from "nestjs-zod"
import { userCreateSchema } from "src/schemas/user/schema"

export class CreateUserDto extends createZodDto(userCreateSchema) {}
