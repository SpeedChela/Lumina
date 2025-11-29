import Link from "next/link";
import { getServerUser } from "@/lib/auth-server";
import Header from "@/components/Header";
import RecentUsers from "./RecentUsers";

export const runtime = "nodejs";

export default async function DashboardPage() {
  const user = await getServerUser();

  return (
    <>
      <Header variant="dashboard" />

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Panel de administración</p>
            <h1 className="text-3xl font-bold text-white">
              {user ? (
                <>
                  Hola,{" "}
                  <span className="text-emerald-400">
                    {user.displayName ?? user.email ?? user.uid}
                  </span>
                </>
              ) : (
                "Dashboard"
              )}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Desde aquí puedes revisar usuarios, categorías y contenido de la
              clase.
            </p>
          </div>

          {user && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
              <p className="font-semibold">Sesión activa</p>
              <p className="text-slate-400 break-all">
                {user.email ?? user.uid}
              </p>
            </div>
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Usuarios
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">24</p>
            <p className="mt-1 text-xs text-emerald-400">+3 hoy (ejemplo)</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Categorías
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">5</p>
            <p className="mt-1 text-xs text-slate-400">
              Noticias, Blog, Tareas…
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Publicaciones
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">18</p>
            <p className="mt-1 text-xs text-slate-400">
              Número de entradas (mock).
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                Usuarios recientes
              </h2>
            </div>

            <RecentUsers />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <h2 className="text-lg font-semibold text-white">
              Acciones rápidas
            </h2>
            <p className="text-sm text-slate-400">
              Atajos para lo que usarás más en clase.
            </p>
            <div className="space-y-2">
              <Link
                href="/dashboard/users"
                className="block w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm px-4 py-2 text-left"
              >
                + Ver usuarios
              </Link>
              <Link
                href="/dashboard/categories"
                className="block w-full rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm px-4 py-2 text-left"
              >
                Administrar categorías
              </Link>
              <Link
                href="/dashboard/activity"
                className="block w-full rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm px-4 py-2 text-left"
              >
                Ver actividad reciente
              </Link>
            </div>
          </div>
        </section>

        {!user && (
          <p className="text-sm text-red-300">
            No hay sesión válida. Verifica el middleware o la cookie de sesión.
          </p>
        )}
      </main>
    </>
  );
}