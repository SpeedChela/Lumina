"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase-cliente";
import styles from "./page.module.css";
import Footer from "../../components/Footer";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      const response = await fetch("/api/sessionLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, remember: true }),
      });

      if (response.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Error al iniciar sesión en el servidor.");
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'auth/invalid-credential') {
        setError("Correo o contraseña incorrectos.");
      } else {
        setError("Ocurrió un error al intentar ingresar.");
      }
    } finally {
      setLoading(false);
    }
  }

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

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label className={styles.label} htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                required
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className={styles.toggleBtn}
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              <div className={styles.row}>
                <label className={styles.checkbox}>
                  <input type="checkbox" name="remember" defaultChecked />
                  <span>Recuérdame</span>
                </label>
                <Link href="/forgot" className={styles.forgot}>¿Olvidaste tu contraseña?</Link>
              </div>

              {error && (
                <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center', marginTop: '0.5rem' }}>
                  {error}
                </p>
              )}

              <button 
                type="submit" 
                className={styles.primaryBtn}
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <div className={styles.or}>o continuar con</div>

              <div className={styles.socials}>
                <button type="button" className={styles.socialBtn}>f</button>
                <button type="button" className={styles.socialBtn}></button>
                <button type="button" className={styles.socialBtn}>G</button>
              </div>

              <p className={styles.register}>
                ¿No tienes cuenta? <Link href="/singup" className={styles.link}>Regístrate</Link>
              </p>

              <p className={styles.register} style={{ marginTop: '1rem' }}>
                <Link href="/" className={styles.link}>Volver al Menú Principal</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}