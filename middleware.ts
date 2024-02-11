"use client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
let AppUrl = "";
export function middleware(request: NextRequest) {
  let token = request.cookies.get("userToken")?.value; // Get the value of cookie named "userToken"
  console.log("middlerware  activited");
  console.log(token);
  if (!token) {
    ("You haven't login")
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/payment", "/createProduct"],
};
