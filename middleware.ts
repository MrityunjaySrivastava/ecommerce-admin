import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Protect dashboard pages
  if (pathname.startsWith("/dashboard")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
    }
  }

  // Protect product & upload APIs
  if (
    pathname.startsWith("/api/products") ||
    pathname.startsWith("/api/upload")
  ) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/products/:path*",
    "/api/upload",
  ],
};
