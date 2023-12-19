import { z } from "nestjs-zod/z"

import { userCreateSchema, userSchema } from "../user/schema"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
export const loginResponseSchema = z.object({
  token: z.string(),
})

export const registerSchema = userCreateSchema.omit({ role: true })
export const registerResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
})

export const updateMeSchema = userCreateSchema
  .pick({ name: true, email: true, password: true })
  .partial()
