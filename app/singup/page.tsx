"use client"; // indica que este componente se renderiza en el cliente (React hooks disponibles)
import React, { useState } from "react"; // import React y hook useState para estado local
import "./signup.css" // <-- import del CSS nuevo
import Link from "next/link"; // componente Link de Next.js para navegación interna
import { useRouter } from "next/navigation"; // hook para redirección programática en Next 13+
import Header from "../components/Header"; // componente Header reutilizable
import { auth } from "../lib/firebase-cliente"; // instancia de auth de Firebase inicializada en lib
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // funciones de auth de Firebase
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"; // proveedor de autenticación de Google

export default function SignUpPage() { // componente de la página de registro
  const router = useRouter(); // router para hacer router.push(...)
  const [name, setName] = useState(""); // estado para nombre
  const [email, setEmail] = useState(""); // estado para email
  const [password, setPassword] = useState(""); // estado para contraseña
  const [confirm, setConfirm] = useState(""); // estado para confirmar contraseña
  const [agree, setAgree] = useState(false); // estado para checkbox de términos
  const [loading, setLoading] = useState(false); // estado de carga (submit)
  const [isError, setIsError] = useState(false); // flag para indicar error
  const [message, setMessage] = useState<string | null>(null); // mensaje para mostrar al usuario

  async function handleFirebaseSignUp(e: React.FormEvent<HTMLFormElement>) { // handler del submit
    e.preventDefault(); // evita recarga de página
    setMessage(null); // limpia mensajes previos
    setIsError(false); // reinicia flag de error

    if (!name.trim() || !email.trim() || !password || !confirm) { // valida campos vacíos
      setIsError(true);
      setMessage("Completa todos los campos.");
      return; // sale si falta algún campo
    }
    if (password.length < 8) { // valida longitud mínima de contraseña
      setIsError(true);
      setMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) { // valida que las contraseñas coincidan
      setIsError(true);
      setMessage("Las contraseñas no coinciden.");
      return;
    }
    if (!agree) { // valida aceptación de términos
      setIsError(true);
      setMessage("Debes aceptar términos y privacidad.");
      return;
    }

    setLoading(true); // activa indicador de carga
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      // crea usuario en Firebase Auth con email y contraseña
      if (cred.user && name.trim()) {
        await updateProfile(cred.user, { displayName: name.trim() }); 
        // opcional: agrega displayName al perfil del usuario en Firebase
      }
      setIsError(false); // no hay error
      setMessage("Usuario creado correctamente. Redirigiendo..."); // mensaje de éxito
      setTimeout(() => router.push("/login"), 900); // redirige al login después de 900ms
    } catch (err: unknown) {
      console.error("Firebase signup error:", err); // log del error en consola (útil para depurar)
      setIsError(true);
      setMessage(err instanceof Error ? err.message : "Error al crear usuario."); 
      // muestra mensaje del error si es instancia de Error, sino mensaje genérico
    } finally {
      setLoading(false); // siempre desactiva indicador de carga
    }
  }
  const signupWithGoogle = () => {
    // función placeholder para registro con Google (no implementada)
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Esto se ejecuta si el registro es exitoso
        console.log("Registro exitoso con Google:", result);
      })
      .catch((error) => {
        // Esto se ejecuta si hay un error
        console.error("Error en el registro con Google:", error);
      });

  }
  return (
    <div className="lumina-signup-root">
      <Header showLoginButton={true} /> {/* header con botón de login controlado por prop */}

      <section className="lumina-section relative overflow-hidden min-h-screen"> {/* sección hero que ocupa al menos toda la pantalla */}
        {/* fondo */}
        <div className="bg-gradient absolute inset-0" /> 
        {/* gradiente de fondo posicionando detrás del contenido */}

        {/* layout principal */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-12 relative h-full flex items-center">
          {/* contenedor centrado con ancho máximo */}
          <div className="grid md:grid-cols-12 gap-12 items-center w-full">
            {/* grid responsive de 12 columnas */}

            {/* Hero izquierdo */}
            <div className="hero-left md:col-span-5 px-6 md:px-0">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
                Crea tu cuenta y comienza a construir
              </h1>
              <p className="mt-5 text-slate-200 text-lg max-w-lg">
                Regístrate para acceder a todas las funcionalidades y llevar tus proyectos al siguiente nivel.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#features"
                  className="inline-flex items-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-5 py-3"
                >
                  Ver características
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold px-5 py-3"
                >
                  Planes
                </Link>
              </div>
              <div className="mt-6 text-xs text-slate-300">
                Regístrate gratis. No se requiere tarjeta de crédito.
              </div>
            </div>

            {/* Card derecho más grande y alineado a la derecha */}
            <div className="card-right md:col-span-7 flex justify-end px-6 md:px-0">
              {/* columna derecha que contiene la tarjeta de registro */}
              <div className="card-wrapper bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl w-full max-w-2xl">
                {/* tarjeta con color, borde, padding y ancho máximo */}
                <header className="mb-6 text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/20 mb-3">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-400" fill="currentColor" aria-hidden="true">
                      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5.33 0-8 2.67-8 6v1h16v-1c0-3.33-2.67-6-8-6Z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-semibold text-white">Crear cuenta</h2>
                  <p className="mt-1 text-sm text-slate-300">Completa los campos para registrarte.</p>
                </header>

                <form className="space-y-4" 
                onSubmit={handleFirebaseSignUp}> {/* formulario que llama a la función de Firebase al enviar */}
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-200">Nombre</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)} // actualiza estado name al escribir
                      placeholder="Tu nombre"
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <p> tu nombre es {name}</p> {/* debug / feedback mostrando el nombre (puedes quitarlo en producción) */}
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-200">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // actualiza estado email
                      placeholder="tucorreo@dominio.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <p> tu correo es {email}</p> {/* feedback temporal */}
                  <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-200">Contraseña</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // actualiza estado password
                      placeholder="********"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <p> tu contraseña es {password}</p> {/* cuidado: nunca mostrar contraseñas en producción */}
                  <div>
                    <label htmlFor="confirm" className="mb-1 block text-sm font-medium text-slate-200">Confirmar contraseña</label>
                    <input
                      id="confirm"
                      name="confirm"
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)} // actualiza estado confirm
                      placeholder="********"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <p> tu confirmación es {confirm}</p> {/* feedback temporal */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="inline-flex items-center gap-2 text-slate-300">
                     
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)} // alterna agree
                        className="rounded border-slate-700 bg-slate-900"
                      />
                      Acepto términos y privacidad
                    </label>
                    <Link href="/login" className="text-slate-300 hover:text-white">¿Ya tienes cuenta?</Link> {/* enlace a login */}
                  </div>
                    <p className="text-slate-300 hover:text-white">
                      ¿Ya tienes cuenta?{" "}
                      <Link href="/login" className="text-emerald-300 hover:text-emerald-200">
                        Inicia sesión
                      </Link>
                    </p>
                  {message && ( // si hay mensaje, lo muestra con estilo según isError
                    <p
                      className={`rounded-xl p-2 text-sm ${isError ? "bg-red-500/10 border border-red-500/30 text-red-300" : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-200"}`}
                      role="status"
                    >
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading} // deshabilita mientras loading=true
                    className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-4 py-3"
                  >
                    {loading ? "Creando..." : "Crear cuenta"} {/* cambia texto según loading */}
                  </button>
                </form>

                <div className="my-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-800" />
                  <span className="text-xs text-slate-400">o</span>
                  <div className="h-px flex-1 bg-slate-800" />
                </div>

                <button
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 px-4 py-2 font-medium text-slate-100 inline-flex items-center justify-center gap-2 cursor-pointer"
                  aria-label="Continuar con Google"
                  type="button"
                  onClick={() => {signupWithGoogle()}} // llama a función placeholder
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                    <path d="M21.35 11.1h-9.18v2.98h5.27a4.52 4.52 0 0 1-1.95 2.96 6.06 6.06 0 0 1-3.32.96 6.06 6.06 0 0 1-4.28-1.78 6.26 6.26 0 0 1-1.76-4.4 6.25 6.25 0 0 1 1.76-4.4 6.06 6.06 0 0 1 4.28-1.78c1.46 0 2.78.5 3.82 1.33l2.1-2.1A9.3 9.3 0 0 0 12.17 2 9.1 9.1 0 0 0 5.7 4.7 9.25 9.25 0 0 0 3 11.82a9.25 9.25 0 0 0 2.7 7.12A9.1 9.1 0 0 0 12.17 22c2.49 0 4.57-.82 6.08-2.37 1.56-1.56 2.41-3.77 2.41-6.42 0-.68-.05-1.28-.31-2.11Z" />
                  </svg>
                  Continuar con Google
                </button>

                <p className="mt-6 text-center text-sm text-slate-400">
                  ¿Necesitas ayuda? <Link href="/#faq" className="text-emerald-400 hover:text-emerald-300 font-medium">FAQ</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      <footer className="site-footer border-t border-slate-800 py-8 text-center text-sm text-slate-400">
        Hecho con Tailwind · © 2025
      </footer>
    </div>
   );
 }