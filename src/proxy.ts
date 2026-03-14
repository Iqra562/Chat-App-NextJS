import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { verifyToken } from "@/lib/jwt";


export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const pathname = req.nextUrl.pathname
    if (token && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }
    if (!token && pathname.startsWith("/dahsboard")) {
        return NextResponse.redirect(new URL("/login", req.url))
    }



    try {
        if (token) {

            verifyToken(token);
        }
        return NextResponse.next()
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url))
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*", 
        "/login",
        "/register"
    ]
}