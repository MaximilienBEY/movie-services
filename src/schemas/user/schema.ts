import { z } from "nestjs-zod/z"

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.string().default("USER"),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

// User Create
export const userCreateSchema = userSchema.pick({ email: true, name: true, role: true }).extend({
  password: z.string().min(6),
})

// User Update
export const userUpdateSchema = userCreateSchema.partial()
