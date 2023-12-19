import { createZodDto } from "nestjs-zod"
import { userUpdateSchema } from "src/schemas/user/schema"

export class UpdateUserDto extends createZodDto(userUpdateSchema) {}
