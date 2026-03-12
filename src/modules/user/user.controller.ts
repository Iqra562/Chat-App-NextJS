import bcrypt from "bcryptjs"
import User from "./user.models"
import { LoginUserInput, RegisterUserInput } from "./user.schema"
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server"

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
export const loginUser = async (data: LoginUserInput) => {

    const existedUser = await User.findOne({ email: data.email })

    if (!existedUser) {
              throw new Error("User does not exist")

    }
    const validPassword = await bcrypt.compare(data.password, existedUser.password);
    if (!validPassword) {
            throw new Error("Password is incorrect")

    }
  const tokenPayload = {
      id:existedUser._id,
  username:existedUser.name,
  email:existedUser.email
  }
const token = jwt.sign(tokenPayload,process.env.TOKEN_SECRET!)
  

return {
    user:{
         id: existedUser._id,
            name: existedUser.name,
            email: existedUser.email
    },token
}
}