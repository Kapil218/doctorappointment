import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/signup"]; // Define public routes
const REFRESH_API = "http://localhost:3000/api/v1/users/refresh";

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const accessToken = cookies.get("accessToken")?.value;
  const refreshToken = cookies.get("refreshToken")?.value;

  // ✅ 1. Allow public routes without authentication
  if (PUBLIC_ROUTES.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // ✅ 2. If access token exists, allow access
  if (accessToken) {
    return NextResponse.next();
  }

  // ✅ 3. If access token is missing but refresh token exists, try refreshing
  if (!accessToken && refreshToken) {
    try {
      const refreshResponse = await fetch(REFRESH_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken } = await refreshResponse.json();
        const response = NextResponse.next();

        // Set new access token in cookies
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });

        return response;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  }

  // ❌ 4. If no valid token, redirect to login
  return NextResponse.redirect(new URL("/login", req.url));
}

// ✅ 5. Apply middleware only to protected routes (exclude API routes)
export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.jpg|.*\\.png).*)",
};
