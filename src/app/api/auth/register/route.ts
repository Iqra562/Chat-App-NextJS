


import { connectDB } from "@/lib/db"
import { registerUserSchema } from "@/modules/user/user.schema"
import { registerUser } from "@/modules/user/user.controller"
import { z } from "zod" 
import { NextResponse } from "next/server"
export async function POST(req: Request) {

    try {

        await connectDB()

        const body = await req.json()

        const result = registerUserSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json({
                success: false,
                errors: result.error.issues
            }, { status: 400 })
        }

        const user = await registerUser(result.data)

        return NextResponse.json({
            success: true,
            data: user
        }, { status: 201 })

    } catch (error:any) {
        if (error instanceof z.ZodError) { return NextResponse.json({ errors: error.issues }, { status: 400 }) }
        return NextResponse.json({
            success: false,
      message: error.message || "Internal server error"
        }, { status: 400 })

    }
}
