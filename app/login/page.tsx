"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className={styles.loginPage}>

      <section className={styles.loginWrapper}>
        <div className={styles.brandCol}>
          <div className={styles.brandInner}>
            <Image
              src="/Images/LogoLetra.png"
              alt="Lumina"
              width={300}
              height={120}
              className={styles.logo}
            />
            <h2 className={styles.tagline}>El brillo que te distingue</h2>

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

        <div className={styles.formCol}>
          <div className={styles.card}>
            <header className={styles.cardHeader}>
              <h1>Iniciar sesión</h1>
              <p className={styles.cardSubtitle}>Accede a tu cuenta para continuar</p>
            </header>

            <form className={styles.form} method="post" action="/api/login" noValidate>
              <label className={styles.label} htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                required
                className={styles.input}
              />

              <label className={styles.label} htmlFor="password">Contraseña</label>
              <div className={styles.passwordRow}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className={styles.input}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className={styles.toggleBtn}
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <div className={styles.row}>
                <label className={styles.checkbox}>
                  <input type="checkbox" name="remember" />
                  <span>Recuérdame</span>
                </label>
                <Link href="/forgot" className={styles.forgot}>¿Olvidaste tu contraseña?</Link>
              </div>

              <button type="submit" className={styles.primaryBtn}>Entrar</button>

              <div className={styles.or}>o continuar con</div>

              <div className={styles.socials}>
                <button type="button" aria-label="Continuar con Facebook" className={styles.socialBtn}>f</button>
                <button type="button" aria-label="Continuar con Apple" className={styles.socialBtn}></button>
                <button type="button" aria-label="Continuar con Google" className={styles.socialBtn}>G</button>
              </div>

              <p className={styles.register}>
                ¿No tienes cuenta? <Link href="/register" className={styles.link}>Regístrate</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}