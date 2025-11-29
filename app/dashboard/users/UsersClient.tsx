"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type AdminUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  disabled: boolean;
  creationTime: string;
  lastSignInTime: string | null;
  providers: string[]; // 👈 ahora también
};

function providerLabel(id: string): string {
  switch (id) {
    case "password":
      return "Email";
    case "google.com":
      return "Google";
    case "facebook.com":
      return "Facebook";
    case "github.com":
      return "GitHub";
    default:
      return id;
  }
}

export default function UsersClient() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setErr(null);
        setLoading(true);
        const res = await fetch("/api/admin/users");

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? `Error ${res.status}`);
        }

        const data = await res.json();
        setUsers(data.users ?? []);
      } catch (e: any) {
        setErr(e?.message ?? "Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Administración</p>
          <h1 className="text-3xl font-bold text-white">Usuarios</h1>
          <p className="mt-2 text-sm text-slate-400">
            Lista de usuarios desde la API /api/admin/users (Firebase Auth).
          </p>
        </div>

        <Link
          href="/dashboard"
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          ← Volver al dashboard
        </Link>
      </section>

      {/* Contenido principal */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        {loading && (
          <p className="text-sm text-slate-400">Cargando usuarios...</p>
        )}

        {err && <p className="mb-4 text-sm text-red-300">{err}</p>}

        {!loading && !err && users.length === 0 && (
          <p className="text-sm text-slate-400">
            No hay usuarios aún. Pídele a alguien que se registre en la app 😊
          </p>
        )}

        {!loading && !err && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 pr-4 text-left font-medium">Nombre</th>
                  <th className="py-2 pr-4 text-left font-medium">Email</th>
                  <th className="py-2 pr-4 text-left font-medium">UID</th>
                  <th className="py-2 pr-4 text-left font-medium">
                    Último acceso
                  </th>
                  <th className="py-2 text-left font-medium">
                    Método de acceso
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-200">
                {users.map((u) => (
                  <tr
                    key={u.uid}
                    className="border-b border-slate-800/60 hover:bg-slate-800/40"
                  >
                    <td className="py-2 pr-4">
                      {u.displayName ?? (
                        <span className="text-slate-500 italic">
                          Sin nombre
                        </span>
                      )}
                    </td>
                    <td className="py-2 pr-4">
                      {u.email ?? (
                        <span className="text-slate-500 italic">Sin email</span>
                      )}
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">{u.uid}</td>
                    <td className="py-2 pr-4 text-xs text-slate-400">
                      {u.lastSignInTime
                        ? new Date(u.lastSignInTime).toLocaleString("es-MX")
                        : "Nunca"}
                    </td>
                    <td className="py-2">
                      {u.providers.length === 0 ? (
                        <span className="inline-flex items-center rounded-full bg-slate-700/40 px-2 py-1 text-[11px] font-medium text-slate-200 border border-slate-600/60">
                          Desconocido
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {u.providers.map((p) => (
                            <span
                              key={p}
                              className="inline-flex items-center px-2 py-1 text-[11px] font-medium text-emerald-300"
                            >
                              {providerLabel(p)}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}