import { cookies, headers } from "next/headers";
import Link from "next/link";

import { getAdminCookieName, verifyAdminSession } from "@/lib/adminAuth";
import { detectLang, getLangCookieName } from "@/lib/i18n";
import ProjectManager from "@/components/admin/ProjectManager";
import ExperienceManager from "@/components/admin/ExperienceManager";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const token = cookies().get(getAdminCookieName())?.value;
  const session = token ? await verifyAdminSession(token) : null;
  const lang = detectLang(cookies().get(getLangCookieName())?.value, headers());

  // Middleware should block unauthenticated access, but keep a graceful fallback.
  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <p className="text-white/80">No autorizado.</p>
          <Link href="/admin" className="text-sm text-white underline">
            Ir a login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-black/40 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-white/70">Sesión: {session.username}</p>
          </div>
          <Link
            href="/admin/logout"
            className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:border-white/20"
          >
            Cerrar sesión
          </Link>
        </div>

        <div className="mt-6 grid gap-6">
          <div className="rounded-xl border border-white/10 p-4">
            <h2 className="font-medium">Gestión rápida</h2>
            <p className="text-sm text-white/70">
              Crea nuevos contenidos para tu portafolio.
            </p>
          </div>

          <ProjectManager lang={lang} />
          <ExperienceManager lang={lang} />
        </div>
      </div>
    </main>
  );
}
