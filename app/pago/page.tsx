"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "../context/CartContext";
import { useSearchParams } from "next/navigation";

export default function PagoPage() {
  const router = useRouter();
  const { subtotal } = useCart();
  const [holder, setHolder] = useState("");
  const [card, setCard] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function detectBrand(num: string) {
    const trimmed = num.replace(/\s+/g, "");
    if (/^4/.test(trimmed)) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(trimmed)) return "mastercard";
    if (/^3[47]/.test(trimmed)) return "amex";
    if (/^6(011|5)/.test(trimmed)) return "discover";
    return null;
  }
  function formatCardInput(v: string) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function handleCardChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCardInput(e.target.value);
    setCard(formatted);
    setBrand(detectBrand(formatted));
  }
  function montoFormateado(v: number) {
    return v.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!holder || !card || !expMonth || !expYear || !cvv) {
      setError("Completa todos los campos.");
      return;
    }
    if (card.replace(/\s+/g, "").length < 13) {
      setError("Número de tarjeta inválido.");
      return;
    }
    if (cvv.length < 3) {
      setError("CVV inválido.");
      return;
    }
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      // Simulated payment succeeded — clear local cart and go to result page
      try { clear(); } catch {}
      router.push("/pago/realizado");
    } catch {
      setError("Error procesando el pago.");
    } finally {
      setLoading(false);
    }
  }

  // If Stripe redirects back with a session_id, verify it and clear cart
  const search = useSearchParams();
  useEffect(() => {
    const sessionId = search?.get("session_id");
    if (!sessionId) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`);
        const data = await res.json();
        if (data?.ok && data?.paid) {
          try { clear(); } catch {}
          if (mounted) router.push("/pago/realizado");
        } else {
          setError("Pago no confirmado.");
        }
      } catch (err) {
        setError("Error verificando el pago.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [search]);

  const total = subtotal || 16000;

  return (
    <>
      <Header showLoginButton={false} />
      <main className="min-h-screen bg-gradient-to-b from-[#fdfaf4] to-white">
        <div className="mx-auto max-w-4xl px-6 py-10">
          {/* Indicador de pasos */}
          <div className="mb-10">
            <ol className="flex items-center justify-between text-[11px] font-semibold tracking-wide">
              <li className="flex-1 flex flex-col items-start">
                <div className="flex items-center w-full">
                  <span className="h-6 w-6 rounded-full border border-gray-400 bg-white inline-flex items-center justify-center">1</span>
                  <div className="h-px flex-1 bg-gray-300 ml-2" />
                </div>
                <span className="mt-2 text-gray-600">CARRITO</span>
              </li>
              <li className="flex-1 flex flex-col items-center">
                <div className="flex items-center w-full">
                  <span className="h-7 w-7 rounded-full border-2 border-[#c0a256] text-[#c0a256] bg-white inline-flex items-center justify-center">2</span>
                  <div className="h-px flex-1 bg-gray-300 ml-2" />
                </div>
                <span className="mt-2 text-[#c0a256]">PAGO</span>
              </li>
              <li className="flex-1 flex flex-col items-end">
                <div className="flex items-center w-full">
                  <span className="h-6 w-6 rounded-full border border-gray-300 bg-white inline-flex items-center justify-center text-gray-400">3</span>
                </div>
                <span className="mt-2 text-gray-400">REALIZADO</span>
              </li>
            </ol>
          </div>

          {/* Métodos de pago (logos) */}
          <section className="bg-white/70 backdrop-blur-sm border border-[#e7ddc9] rounded-xl p-5 shadow-sm mb-8">
            <h2 className="text-center font-bold text-xs mb-4 tracking-[0.15em] text-gray-700">MÉTODOS DE PAGO ACEPTADOS</h2>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Image src="/Images/paypal.png" alt="PayPal" width={72} height={32} />
              <Image src="/Images/mastercard.png" alt="MasterCard" width={72} height={32} />
              <Image src="/Images/visa.png" alt="Visa" width={72} height={32} />
              <Image src="/Images/amex.png" alt="AmEx" width={72} height={32} />
              <Image src="/Images/discover.png" alt="Discover" width={72} height={32} />
            </div>
          </section>

          {/* Formulario completo sin panel lateral */}
          <form onSubmit={handleSubmit} className="space-y-7 bg-white/80 border border-[#e7ddc9] rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold tracking-wide text-gray-800 mb-2 text-center">Detalles de la Tarjeta</h1>

            <div className="max-w-2xl mx-auto">
              <label className="block text-xs font-semibold tracking-wide mb-2 text-gray-700 text-center">Nombre del titular</label>
              <input
                type="text"
                value={holder}
                onChange={e => setHolder(e.target.value)}
                className="w-full rounded-lg bg-white border border-[#d6c9b0] px-4 py-4 text-base outline-none focus:ring-2 focus:ring-[#c0a256]/40"
                placeholder="Nombre completo"
                required
                autoComplete="cc-name"
              />
            </div>

            <div className="max-w-2xl mx-auto">
              <label className="block text-xs font-semibold tracking-wide mb-2 text-gray-700 text-center">Número de tarjeta</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={card}
                  onChange={handleCardChange}
                  className="flex-1 rounded-lg bg-white border border-[#d6c9b0] px-4 py-4 text-base outline-none focus:ring-2 focus:ring-[#c0a256]/40 font-mono tracking-widest"
                  placeholder="•••• •••• •••• ••••"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  required
                />
                <div className="flex items-center gap-2 pr-1 min-w-[46px] justify-end">
                  {brand && (
                    <Image
                      src={`/Images/${brand}.png`}
                      alt={brand}
                      width={40}
                      height={22}
                      className="object-contain"
                    />
                  )}
                  {!brand && <span className="text-[10px] text-gray-500">?</span>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-xs font-semibold tracking-wide mb-2 text-center text-gray-700">Mes</label>
                <input
                  type="text"
                  value={expMonth}
                  onChange={e => setExpMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
                  className="w-full rounded-lg bg-white border border-[#d6c9b0] px-4 py-4 text-lg text-center outline-none focus:ring-2 focus:ring-[#c0a256]/40"
                  placeholder="MM"
                  required
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide mb-2 text-center text-gray-700">Año</label>
                <input
                  type="text"
                  value={expYear}
                  onChange={e => setExpYear(e.target.value.replace(/\D/g, "").slice(0, 2))}
                  className="w-full rounded-lg bg-white border border-[#d6c9b0] px-4 py-4 text-lg text-center outline-none focus:ring-2 focus:ring-[#c0a256]/40"
                  placeholder="AA"
                  required
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide mb-2 text-center text-gray-700">CVV</label>
                <input
                  type="password"
                  value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="w-full rounded-lg bg-white border border-[#d6c9b0] px-4 py-4 text-lg text-center outline-none focus:ring-2 focus:ring-[#c0a256]/40"
                  placeholder="•••"
                  required
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="pt-6 space-y-4 max-w-2xl mx-auto">
              <div className="space-y-3 text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{montoFormateado(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium">Gratis</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold tracking-wide">Total</span>
                  <span className="font-semibold text-[#c0a256]">{montoFormateado(total)}</span>
                </div>
              </div>

              <div className="rounded-lg bg-white/70 border border-[#e7ddc9] px-5 py-4 text-xs text-gray-600 text-center tracking-wide">
                Tus datos están seguros. Transacción cifrada (demo).
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 text-center">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/carrito")}
                  className="border border-[#d6c9b0] rounded-lg px-8 py-3 text-base font-medium tracking-wide hover:bg-[#f5efe2] transition-colors"
                >
                  ATRÁS
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#c0a256] hover:bg-[#b09148] text-white font-semibold rounded-lg px-8 py-3 text-base tracking-wide disabled:opacity-60 shadow-sm transition-colors"
                >
                  {loading ? "Procesando..." : `PAGAR ${montoFormateado(total)}`}
                </button>
              </div>
            </div>
          </form>

          {/* Seguridad */}
          <div className="mt-8 rounded-xl bg-white/60 border border-[#e7ddc9] p-5 text-xs text-gray-600 space-y-1 text-center max-w-2xl mx-auto">
            <p className="font-semibold tracking-wide text-gray-700 mb-1">Seguridad</p>
            <p>• Validación básica de número y CVV.</p>
            <p>• No almacenamos datos sensibles (demo).</p>
            <p>• Usa tarjetas de prueba, no reales.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}