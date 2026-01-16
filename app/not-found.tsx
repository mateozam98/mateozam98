import Link from "next/link";

export const metadata = {
  title: "404 | Página no encontrada",
};

export default function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070b] px-6 py-20 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-120px] h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute right-[-120px] top-[10%] h-[360px] w-[360px] rounded-full bg-fuchsia-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="text-sm uppercase tracking-[0.3em] text-white/60">Error</div>
        <h1 className="text-5xl font-semibold md:text-6xl">404</h1>
        <p className="max-w-lg text-sm text-white/70 md:text-base">
          La página que buscas no existe o fue movida. Verifica la URL o regresa al inicio.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
