import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect("/login");
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
}
