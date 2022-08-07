import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("token");

  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    jwtVerify(jwt, new TextEncoder().encode("secret"));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}


export const config ={
    matcher : ['/dashboard','/','/admin/:path*']
}