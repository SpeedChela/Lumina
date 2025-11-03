"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

/* Componente de la página de login.
   - Usa estado local para alternar visibilidad de la contraseña.
   - Export default para que Next.js lo trate como página en /login. */
export default function LoginPage() {
  // Estado que controla si la contraseña se muestra en texto plano o en oculto
  const [showPassword, setShowPassword] = useState(false);

  return (
    // Contenedor principal de la página, aplica estilos desde el módulo CSS
    <main className={styles.loginPage}>

      {/* Wrapper que contiene las dos columnas: branding (izq) + formulario (der) */}
      <section className={styles.loginWrapper}>

        {/* Columna de marca: logo, eslogan e ícono */}
        <div className={styles.brandCol}>
          <div className={styles.brandInner}>
            {/* Imagen del logo (usa public/Images/LogoLetra.png) */}
            <Image
              src="/Images/LogoLetra.png"
              alt="Lumina"
              width={300}
              height={120}
              className={styles.logo}
            />
            {/* Eslogan / tagline */}
            <h2 className={styles.tagline}>El brillo que te distingue</h2>

            {/* Recuadro que contiene el ícono/diamante */}
            <div className={styles.diamond}>
              <Image
                src="/Images/luminalogosolo.png"
                alt="Ícono diamante"
                width={160}
                height={160}
              />
            </div>
          </div>
        </div>

        {/* Columna del formulario */}
        <div className={styles.formCol}>
          <div className={styles.card}>
            {/* Encabezado de la tarjeta del formulario */}
            <header className={styles.cardHeader}>
              <h1>Iniciar sesión</h1>
              <p className={styles.cardSubtitle}>Accede a tu cuenta para continuar</p>
            </header>

            {/* Formulario real:
                - method/action son de ejemplo (puedes conectar tu API).
                - noValidate evita validación HTML automática si manejas validación por JS. */}
            <form className={styles.form} method="post" action="/api/login" noValidate>
              {/* Campo correo */}
              <label className={styles.label} htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                required
                className={styles.input}
              />

              {/* Campo contraseña con fila que contiene el input + botón para mostrar/ocultar */}
              <label className={styles.label} htmlFor="password">Contraseña</label>
              <div className={styles.passwordRow}>
                {/* Input de contraseña — su tipo depende del estado showPassword */}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className={styles.input}
                />
                {/* Botón para alternar visibilidad.
                    - type="button" evita que actúe como submit.
                    - aria-label accesible según el estado. */}
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className={styles.toggleBtn}
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {/* Aquí puedes poner un icono SVG o emoji; se dejó vacío para que lo estilices */}
                </button>
              </div>

              {/* Fila con "Recuérdame" y enlace de recuperar contraseña */}
              <div className={styles.row}>
                <label className={styles.checkbox}>
                  <input type="checkbox" name="remember" />
                  <span>Recuérdame</span>
                </label>
                <Link href="/forgot" className={styles.forgot}>¿Olvidaste tu contraseña?</Link>
              </div>

              {/* Botón principal para enviar el formulario */}
              <button type="submit" className={styles.primaryBtn}>Entrar</button>

              {/* Separador para opciones sociales */}
              <div className={styles.or}>o continuar con</div>

              {/* Botones sociales (solo UI, sin integración) */}
              <div className={styles.socials}>
                <button type="button" aria-label="Continuar con Facebook" className={styles.socialBtn}>f</button>
                <button type="button" aria-label="Continuar con Apple" className={styles.socialBtn}></button>
                <button type="button" aria-label="Continuar con Google" className={styles.socialBtn}>G</button>
              </div>

              {/* Enlace para registrarse */}
              <p className={styles.register}>
                ¿No tienes cuenta? <Link href="/register" className={styles.link}>Regístrate</Link>
              </p>

              {/* NUEVO: Enlace para volver al menú principal */}
              <p className={styles.register} style={{ marginTop: '1rem' }}>
                <Link href="/" className={styles.link}>Volver al Menú Principal</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}