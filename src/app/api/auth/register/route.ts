


import { connectDB } from "@/lib/db"
import { registerUserSchema } from "@/modules/user/user.schema"
import { registerUser } from "@/modules/user/user.controller"
import { z } from "zod" 
export async function POST(req: Request) {

    try {

        await connectDB()

        const body = await req.json()

        const result = registerUserSchema.safeParse(body)

        if (!result.success) {
            return Response.json({
                success: false,
                errors: result.error.issues
            }, { status: 400 })
        }

        const user = await registerUser(result.data)

        return Response.json({
            success: true,
            data: user
        }, { status: 201 })

    } catch (error:any) {
        if (error instanceof z.ZodError) { return Response.json({ errors: error.issues }, { status: 400 }) }
        return Response.json({
            success: false,
      message: error.message || "Internal server error"
        }, { status: 400 })

    }
}
