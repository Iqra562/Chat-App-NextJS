import bcrypt from "bcryptjs"
import User from "./user.models"
import { RegisterUserInput } from "./user.schema"

export const registerUser = async (data: RegisterUserInput) => {

  const existedUser = await User.findOne({ email: data.email })

  if (existedUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword
  })

  return user
}