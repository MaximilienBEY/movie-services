import { z } from "zod"

import {
  loginResponseSchema,
  loginSchema,
  registerResponseSchema,
  registerSchema,
  updateMeSchema,
} from "./schema"

export type LoginType = z.infer<typeof loginSchema>
export type RegisterType = z.infer<typeof registerSchema>

export type LoginResponseType = z.infer<typeof loginResponseSchema>
export type RegisterResponseType = z.infer<typeof registerResponseSchema>

export type UserMeUpdateType = z.infer<typeof updateMeSchema>
