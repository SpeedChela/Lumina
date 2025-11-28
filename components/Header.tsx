"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CartButton from "../components/CartButton";

type Props = {
  showLoginButton?: boolean;
  variant?: "public" | "dashboard";
};

export default function Header({ showLoginButton = true, variant = "public" }: Props) {
  const router = useRouter();
  const isDashboard = variant === "dashboard";
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/sessionLogout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Error al cerrar sesión", e);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="site-header">
      <nav className="container nav">
        <div className="nav-logo">
          <Link href={isDashboard ? "/dashboard" : "/"} aria-label="Ir al inicio">
            <Image
              src="/Images/LogoLetra.png"
              alt="Logo Lumina"
              width={220}
              height={200}
              style={{ maxWidth: "90px", width: "100%", margin: "0 1rem 0 0", borderRadius: "12px" }}
            />
          </Link>
        </div>

        {isDashboard ? (
          <nav className="nav-links">
            <Link href="/dashboard" className="navLink">Panel</Link>
            <Link href="/dashboard/users" className="navLink">Usuarios</Link>
            <Link href="/dashboard/categories" className="navLink">Categorías</Link>
            <Link href="/dashboard/products" className="navLink">Productos</Link>
          </nav>
        ) : (
          <nav className="nav-links">
            <Link href="/productos" className="navLink">Productos</Link>
            <Link href="#about" className="navLink">Nosotros</Link>
            <Link href="#contact" className="navLink">Contacto</Link>
          </nav>
        )}

        <ul className="menu">
          {!isDashboard && <li><CartButton /></li>}
          {isDashboard ? (
            <li>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="btnTransparente"
              >
                {loggingOut ? "Cerrando..." : "Cerrar sesión"}
              </button>
            </li>
          ) : (
            showLoginButton && (
              <>
                <li><Link href="/login" className="btnTransparente">Inicio de Sesión</Link></li>
                <li><Link href="/singup" className="btnYellow">Registrarse</Link></li>
              </>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}