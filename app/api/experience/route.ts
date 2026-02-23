import { NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

const EXPERIENCE_PATH = "admin/experience.json";

type StoredExperience = {
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  thumbnail: string;
  isCurrent?: boolean;
  createdAt?: number;
};

async function getExperienceFromBlob() {
  const { blobs } = await list({ prefix: EXPERIENCE_PATH, limit: 1 });
  const blob = blobs[0];
  if (!blob) return [] as StoredExperience[];

  const res = await fetch(blob.url, { cache: "no-store" });
  if (!res.ok) return [] as StoredExperience[];

  const data = (await res.json().catch(() => [])) as StoredExperience[];
  return Array.isArray(data) ? data : [];
}

export async function GET() {
  try {
    const experience = await getExperienceFromBlob();
    return NextResponse.json({ ok: true, experience });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to load experience" },
      { status: 500 },
    );
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
    const blob = await put(EXPERIENCE_PATH, payload, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });

    return NextResponse.json({ ok: true, url: blob.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save experience";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
