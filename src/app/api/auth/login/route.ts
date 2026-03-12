import { connectDB } from "@/lib/db"
import { loginUserSchema } from "@/modules/user/user.schema"
import { loginUser } from "@/modules/user/user.controller"
import { z } from "zod" 
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {

        await connectDB()

        const body = await req.json()

        const result = loginUserSchema.safeParse(body)

        if (!result.success) {
             return NextResponse.json({
                success: false,
                errors: result.error.issues
            }, { status: 400 })
        }

        const {user,token} = await loginUser(result.data)

        const response = NextResponse.json({
            success: true,
            message: "User logged in successfully",
            data: user
        })
 response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })

        return response
       

    } catch (error:any) {
        if (error instanceof z.ZodError) { return Response.json({ errors: error.issues }, { status: 400 }) }
        return NextResponse.json({
            success: false,
      message: error.message || "Internal server error"
        }, { status: 500 })

    }
}
