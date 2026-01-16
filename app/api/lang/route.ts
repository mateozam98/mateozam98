import { NextResponse } from "next/server";

import { getLangCookieName, normalizeLangValue } from "@/lib/i18n";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = normalizeLangValue(url.searchParams.get("lang"));
  const next = url.searchParams.get("next") || "/";

  if (!lang) {
    return NextResponse.redirect(new URL(next, request.url));
  }

  const res = NextResponse.redirect(new URL(next, request.url));
  res.cookies.set({
    name: getLangCookieName(),
    value: lang,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const lang = normalizeLangValue(body?.lang);

  if (!lang) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true, lang });
  res.cookies.set({
    name: getLangCookieName(),
    value: lang,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
