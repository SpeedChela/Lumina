"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "../app/context/CartContext";
import CartButton from "../components/CartButton";
// import Footer from "../components/Footer";

type Props = {
  showLoginButton?: boolean;
  variant?: "public" | "dashboard";
  hideNav?: boolean;
};

type User = {
  displayName?: string;
  email?: string;
  uid?: string;
};

export default function Header({ showLoginButton = true, variant = "public", hideNav = false }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = variant === "dashboard";

  const [loggingOut, setLoggingOut] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { clear } = useCart();

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/sessionLogout", { method: "POST" });
      // Clear local user state immediately so the header shows Login/Register
      setUser(null);
      // Clear cart immediately on logout so badge disappears
      try { clear(); } catch (e) { /* ignore if cart not available */ }
      // Navigate back to home and refresh server data
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Error al cerrar sesión", e);
    } finally {
      setLoggingOut(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/sessionUser");
        if (!mounted) return;
        const data = await res.json();
        setUser(data?.user ?? null);
      } catch {
        // ignorar
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <header className="site-header">
      <nav className="container nav">
        {/* LOGO */}
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

        {/* LINKS DE NAVEGACIÓN */}
        {isDashboard ? (
          <nav className="nav-links">
            <Link href="/dashboard" className="navLink">Panel</Link>
            <Link href="/dashboard/users" className="navLink">Usuarios</Link>
            <Link href="/dashboard/categories" className="navLink">Categorías</Link>
          </nav>
        ) : (
          !hideNav && (
            <nav className="nav-links">
              <Link href="/productos" className="navLink">Productos</Link>
              <Link href="/nosotros" className="navLink">Nosotros</Link>
              <Link href="#contacto" className="navLink">Contacto</Link>
            </nav>
          )
        )}

        {/* MENÚ DERECHA */}
        <ul className="menu">
          {/* Carrito condicional */}
          {!isDashboard && pathname !== "/singup" && (
            <li>
              {user ? (
                <CartButton /> // usuario logueado → carrito normal
              ) : (
                <CartButton
                  onClick={() => router.push("/login")} // no hay usuario → login
                  className="cartLink"
                  ariaLabel="Ir al carrito"
                />
              )}
            </li>
          )}

          {isDashboard ? (
            // DASHBOARD: solo botón de cerrar sesión
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
                {!user && (
                  <>
                    {/* Ocultar "Iniciar sesión" en /login y /singup */}
                    {pathname !== "/login" && pathname !== "/singup" && (
                      <li>
                        <Link href="/login" className="btnTransparente">Iniciar sesión</Link>
                      </li>
                    )}

                    {/* Ocultar "Registrarse" en /singup */}
                    {pathname !== "/singup" && (
                      <li>
                        <Link href="/singup" className="btnYellow">Registrarse</Link>
                      </li>
                    )}
                  </>
                )}

                {user && (
                  <>
                    <li className="navGreeting">
                      <Link href="/perfil" style={{ textDecoration: "none", color: "inherit" }}>
                        Hola, {user.displayName ?? user.email ?? user.uid}
                      </Link>
                    </li>
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
                  </>
                )}
              </>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}
