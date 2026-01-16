import { NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

const PROJECTS_PATH = "admin/projects.json";

type StoredProject = {
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  link: string;
  image: string;
  categoryKey: string;
};

async function getProjectsFromBlob() {
  const { blobs } = await list({ prefix: PROJECTS_PATH, limit: 1 });
  const blob = blobs[0];
  if (!blob) return [] as StoredProject[];

  const res = await fetch(blob.url, { cache: "no-store" });
  if (!res.ok) return [] as StoredProject[];

  const data = (await res.json().catch(() => [])) as StoredProject[];
  return Array.isArray(data) ? data : [];
}

export async function GET() {
  try {
    const projects = await getProjectsFromBlob();
    return NextResponse.json({ ok: true, projects });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to load projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "Missing BLOB_READ_WRITE_TOKEN" },
        { status: 500 },
      );
    }
    const body = await request.json().catch(() => null);
    if (!Array.isArray(body)) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    const payload = JSON.stringify(body, null, 2);
    const blob = await put(PROJECTS_PATH, payload, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });

    return NextResponse.json({ ok: true, url: blob.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save projects";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
