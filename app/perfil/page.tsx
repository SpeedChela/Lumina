"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateProfile, User } from "firebase/auth";
import { auth } from "../../lib/firebase-cliente";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function PerfilPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
      }
    });
    return () => unsubscribe();
  }, [router]);

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateProfile(user, {
        displayName: displayName.trim(),
      });
      setSuccess(true);
      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      setError("No se pudo actualizar el perfil");
    } finally {
      setLoading(false);
    }
  }

  if (!user) return null;

  return (
    <>
      <Header showLoginButton={false} />
      <main className="min-h-screen bg-gradient-to-b from-[#fdfaf4] to-white py-10">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white/80 border border-[#e7ddc9] rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold tracking-wide text-gray-800 mb-6 text-center">
              Mi Perfil
            </h1>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold tracking-wide mb-2 text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full rounded-lg bg-gray-100 border border-[#d6c9b0] px-4 py-3 text-base text-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">El correo no se puede cambiar</p>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide mb-2 text-gray-700">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Ingresa tu nombre"
                  className="w-full rounded-lg bg-white border border-[#d6c9b0] px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[#c0a256]/40"
                  maxLength={50}
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 text-center">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 text-center">
                  ✓ Perfil actualizado correctamente
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="flex-1 border border-[#d6c9b0] rounded-lg px-6 py-3 text-base font-medium tracking-wide hover:bg-[#f5efe2] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading || !displayName.trim()}
                  className="flex-1 bg-[#c0a256] hover:bg-[#b09148] text-white font-semibold rounded-lg px-6 py-3 text-base tracking-wide disabled:opacity-60 shadow-sm transition-colors"
                >
                  {loading ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-block text-sm text-[#c0a256] hover:text-[#b09148] font-medium tracking-wide transition-colors"
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}