export type AdminSession = {
  username: string;
  exp: number; // unix ms
};

const COOKIE_NAME = "admin_session" as const;

function getEnv(name: string): string | undefined {
  return process.env[name];
}

function getTextEncoder(): TextEncoder {
  return new TextEncoder();
}

function bytesToBase64Url(bytes: Uint8Array): string {
  if (typeof (globalThis as any).Buffer !== "undefined") {
    return (globalThis as any)
      .Buffer.from(bytes)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  // btoa expects binary string
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "===".slice((base64.length + 3) % 4);

  if (typeof (globalThis as any).Buffer !== "undefined") {
    const buf: Uint8Array = (globalThis as any).Buffer.from(padded, "base64");
    return new Uint8Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  }

  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;
}

async function hmacSha256(secret: string, data: BufferSource): Promise<Uint8Array> {
  const encoder = getTextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, data);
  return new Uint8Array(signature);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a[i] ^ b[i];
  return result === 0;
}

function getAdminSecret(): string {
  return (
    getEnv("ADMIN_SECRET") ||
    getEnv("NEXTAUTH_SECRET") ||
    ""
  );
}

export function getAdminCookieName(): string {
  return COOKIE_NAME;
}

export function getAdminExpectedUsername(): string {
  return getEnv("ADMIN_USERNAME") || "";
}

export function isAdminConfigReady(): boolean {
  return Boolean(getEnv("ADMIN_USERNAME") && getEnv("ADMIN_PASSWORD") && getAdminSecret());
}

export async function signAdminSession(session: AdminSession): Promise<string> {
  const secret = getAdminSecret();
  if (!secret) {
    throw new Error(
      "ADMIN_SECRET is not set (or NEXTAUTH_SECRET). Set it to sign admin sessions.",
    );
  }

  const payloadBytes = getTextEncoder().encode(JSON.stringify(session));
  const sigBytes = await hmacSha256(secret, toArrayBuffer(payloadBytes));
  return `${bytesToBase64Url(payloadBytes)}.${bytesToBase64Url(sigBytes)}`;
}

export async function verifyAdminSession(token: string): Promise<AdminSession | null> {
  const secret = getAdminSecret();
  if (!secret) return null;

  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return null;

  let payloadBytes: Uint8Array;
  let sigBytes: Uint8Array;
  try {
    payloadBytes = base64UrlToBytes(payloadB64);
    sigBytes = base64UrlToBytes(sigB64);
  } catch {
    return null;
  }

  const expectedSig = await hmacSha256(secret, toArrayBuffer(payloadBytes));
  if (!timingSafeEqual(sigBytes, expectedSig)) return null;

  let session: AdminSession;
  try {
    session = JSON.parse(new TextDecoder().decode(toArrayBuffer(payloadBytes)));
  } catch {
    return null;
  }

  if (!session || typeof session.username !== "string" || typeof session.exp !== "number") {
    return null;
  }

  if (Date.now() > session.exp) return null;

  return session;
}

export function getAdminPassword(): string | undefined {
  return getEnv("ADMIN_PASSWORD");
}
