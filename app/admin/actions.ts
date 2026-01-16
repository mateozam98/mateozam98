"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  getAdminCookieName,
  getAdminExpectedUsername,
  getAdminPassword,
  isAdminConfigReady,
  signAdminSession,
} from "@/lib/adminAuth";

export async function adminLogin(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "").trim();

  if (!isAdminConfigReady()) {
    redirect("/admin?error=config");
  }

  const expectedUsername = getAdminExpectedUsername();
  const expectedPassword = getAdminPassword()!;

  if (username !== expectedUsername || password !== expectedPassword) {
    redirect("/admin?error=invalid");
  }

  const token = await signAdminSession({
    username,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  cookies().set({
    name: getAdminCookieName(),
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  if (next && next.startsWith("/admin")) {
    redirect(next);
  }

  redirect("/admin/dashboard");
}
