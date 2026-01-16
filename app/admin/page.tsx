import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { adminLogin } from "./actions";
import {
  getAdminCookieName,
  isAdminConfigReady,
  verifyAdminSession,
} from "@/lib/adminAuth";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string; next?: string };
}) {
  const token = cookies().get(getAdminCookieName())?.value;
  if (token) {
    const session = await verifyAdminSession(token);
    if (session) redirect("/admin/dashboard");
  }

  const error = searchParams?.error;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070b] px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[-120px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-[140px]" />
        <div className="absolute right-[-160px] top-[20%] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-[-160px] left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl items-center justify-center">
        <div className="grid w-full gap-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-xl md:grid-cols-[1.1fr_1fr] md:p-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
              Área privada
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold md:text-4xl">Acceso restrigido</h1>
              <p className="text-sm text-white/70 md:text-base">
                Inicia sesión para gestionar tu portafolio seguro y moderno.
              </p>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="text-sm text-white/60">Consejos rápidos</div>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Usa una contraseña fuerte y única.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Tu sesión se mantiene por 7 días.
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Iniciar sesión</h2>
              <p className="text-sm text-white/60">Bienvenido</p>
            </div>

            {!isAdminConfigReady() ? (
              <div className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-200">
                Falta configuración. Define{" "}
                <code className="font-mono">ADMIN_USERNAME</code>,{" "}
                <code className="font-mono">ADMIN_PASSWORD</code> y{" "}
                <code className="font-mono">ADMIN_SECRET</code> en tu entorno.
              </div>
            ) : null}

            {error ? (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                {error === "invalid" && "Usuario o contraseña incorrectos."}
                {error === "config" && "Configuración de admin incompleta."}
              </div>
            ) : null}

            <form action={adminLogin} className="space-y-4">
              {searchParams?.next ? (
                <input type="hidden" name="next" value={searchParams.next} />
              ) : null}

              <div className="space-y-2">
                <label className="text-sm text-white/80" htmlFor="username">
                  Usuario
                </label>
                <input
                  id="username"
                  name="username"
                  autoComplete="username"
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                  placeholder="admin"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/80" htmlFor="password">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 outline-none transition focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-400/10"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
                disabled={!isAdminConfigReady()}
              >
                <span className="relative z-10">Entrar</span>
                <span className="absolute inset-0 -translate-x-full bg-white/40 transition group-hover:translate-x-0" />
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm text-white/60">
              <Link href="/" className="hover:text-white">
                Volver al sitio
              </Link>
              <Link href="/admin/logout" className="hover:text-white">
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
