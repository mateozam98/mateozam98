import { NextResponse } from "next/server";

import { getAdminCookieName } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const res = NextResponse.redirect(new URL("/admin", request.url));
  res.cookies.set({
    name: getAdminCookieName(),
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
