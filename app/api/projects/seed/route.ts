import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

import { getProjectsSeedPayload } from "@/data";

const PROJECTS_PATH = "admin/projects.json";

export async function POST() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "Missing BLOB_READ_WRITE_TOKEN" },
      { status: 500 },
    );
  }

  const payload = JSON.stringify(getProjectsSeedPayload(), null, 2);
  const blob = await put(PROJECTS_PATH, payload, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });

  return NextResponse.json({ ok: true, url: blob.url });
}
