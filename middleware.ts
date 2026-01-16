import { NextRequest, NextResponse } from "next/server";

import { getAdminCookieName, verifyAdminSession } from "@/lib/adminAuth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin/*
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow the login page and logout endpoint
  if (pathname === "/admin" || pathname.startsWith("/admin/logout")) {
    return NextResponse.next();
  }

  const token = req.cookies.get(getAdminCookieName())?.value;
  const session = token ? await verifyAdminSession(token) : null;

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
