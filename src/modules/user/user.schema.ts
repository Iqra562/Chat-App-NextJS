import { z } from "zod"

export const registerUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>


export const loginUserSchema = z.object({
   email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required")
})

export type LoginUserInput = z.infer<typeof loginUserSchema>