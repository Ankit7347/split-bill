import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

// Define routes
const authPages = ["/login", "/register"];
const protectedRoutes = ["/admin","/dashboard"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Get session token from cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // ✅ Redirect logged-in users away from login/register
  if (token && authPages.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // ✅ Apply auth guard to /admin routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 👇 This ensures middleware runs for specific paths
export const config = {
  matcher: ["/admin/:path*","/dashboard/:path*", "/login", "/register"],
};