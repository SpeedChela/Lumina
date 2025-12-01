import Link from "next/link";
import { getServerUser } from "@/lib/auth-server";
import Header from "@/components/Header";
import './dashboard.css';

export const runtime = "nodejs";

export default async function DashboardPage() {
  const user = await getServerUser();

  return (
    <>
      <Header variant="dashboard" />

      <main>
        {/* Encabezado */}
        <section className="dashboard-header">
          <div>
            <p>Panel de administración</p>
            <h1>
              {user ? (
                <>
                  Hola, <span className="highlight">{user.displayName ?? user.email ?? user.uid}</span>
                </>
              ) : (
                "Dashboard"
              )}
            </h1>
            <p>Desde aquí puedes revisar usuarios, categorías y contenido de la clase.</p>
          </div>

          {user && (
            <div className="card">
              <p className="font-semibold">Sesión activa</p>
              <p className="break">{user.email ?? user.uid}</p>
            </div>
          )}
        </section>

        {/* Estadísticas */}
        <section className="stats-table">
          <div className="stat-row">
            <div className="stat-cell">
              <p className="title">Usuarios</p>
              <p className="value">24</p>
              <p className="note">+1 hoy (ayer: 0)</p>
            </div>
            <div className="stat-cell">
              <p className="title">Categorías</p>
              <p className="value">5</p>
              <p className="note">Noticias, Blog, Tareas…</p>
            </div>
            <div className="stat-cell">
              <p className="title">Publicaciones</p>
              <p className="value">18</p>
              <p className="note">Número de entradas (total)</p>
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          {/* Usuarios recientes */}
          <div className="card">
            <h2>Usuarios recientes</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Correo</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>pruebaadmin@lumina.com</td>
                  <td>30/11/2023</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Acciones rápidas */}
          <div className="card quick-actions">
            <h2>Acciones rápidas</h2>
            <p>Atajos para lo que usarás más en clase.</p>
            <Link href="/dashboard/users">+ Ver usuarios</Link>
            <Link href="/dashboard/categories">Administrar categorías</Link>
            <Link href="/dashboard/activity">Ver actividad reciente</Link>
          </div>
        </section>

        {/* Mensaje si no hay usuario */}
        {!user && (
          <p style={{ color: "red", fontSize: "0.875rem" }}>
            No hay sesión válida. Verifica el middleware o la cookie de sesión.
          </p>
        )}
      </main>
    </>
  );
}