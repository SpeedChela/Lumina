"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function PagoClient() {
  const router = useRouter();
  const { subtotal, clear } = useCart();
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
      await new Promise((r) => setTimeout(r, 1000));
      try {
        clear();
      } catch {}
      router.push("/pago/realizado?mode=demo");
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
          if (mounted) router.push(`/pago/realizado?session_id=${encodeURIComponent(sessionId)}`);
        } else {
          setError("Pago no confirmado.");
        }
      } catch {
        setError("Error verificando el pago.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [search, clear, router]);

  const total = subtotal || 16000;

  return (
    <>
      <main>
        <div className="mx-auto max-w-4xl px-6 py-10">
          <form onSubmit={handleSubmit} className="space-y-7 bg-white/80 border border-[#e7ddc9] rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold tracking-wide text-gray-800 mb-2 text-center">Detalles de la Tarjeta</h1>
            <div className="max-w-2xl mx-auto">
              <label className="block text-xs font-semibold tracking-wide mb-2 text-gray-700 text-center">Nombre del titular</label>
              <input type="text" value={holder} onChange={(e) => setHolder(e.target.value)} className="w-full rounded-lg bg-white border border-[#d6c9b0] px-4 py-4 text-base outline-none focus:ring-2 focus:ring-[#c0a256]/40" placeholder="Nombre completo" required autoComplete="cc-name" />
            </div>

            <div className="max-w-2xl mx-auto">
              <label className="block text-xs font-semibold tracking-wide mb-2 text-gray-700 text-center">Número de tarjeta</label>
              <div className="flex items-center gap-2">
                <input type="text" value={card} onChange={handleCardChange} className="flex-1 rounded-lg bg-white border border-[#d6c9b0] px-4 py-4 text-base outline-none focus:ring-2 focus:ring-[#c0a256]/40 font-mono tracking-widest" placeholder="•••• •••• •••• ••••" inputMode="numeric" autoComplete="cc-number" required />
                <div className="flex items-center gap-2 pr-1 min-w-[46px] justify-end">
                  {brand && <Image src={`/Images/${brand}.png`} alt={brand} width={40} height={22} className="object-contain" />}
                  {!brand && <span className="text-[10px] text-gray-500">?</span>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-xs font-semibold tracking-wide mb-2 text-center text-gray-700">Mes</label>
                <input type="text" value={expMonth} onChange={(e) => setExpMonth(e.target.value.replace(/\D/g, "").slice(0, 2))} className="w-full rounded-lg bg-white border border-[#d6c9b0] px-4 py-4 text-lg text-center outline-none focus:ring-2 focus:ring-[#c0a256]/40" placeholder="MM" required inputMode="numeric" />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide mb-2 text-center text-gray-700">Año</label>
                <input type="text" value={expYear} onChange={(e) => setExpYear(e.target.value.replace(/\D/g, "").slice(0, 2))} className="w-full rounded-lg bg-white border border-[#d6c9b0] px-4 py-4 text-lg text-center outline-none focus:ring-2 focus:ring-[#c0a256]/40" placeholder="AA" required inputMode="numeric" />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide mb-2 text-center text-gray-700">CVV</label>
                <input type="password" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} className="w-full rounded-lg bg-white border border-[#d6c9b0] px-4 py-4 text-lg text-center outline-none focus:ring-2 focus:ring-[#c0a256]/40" placeholder="•••" required inputMode="numeric" />
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

              <div className="rounded-lg bg-white/70 border border-[#e7ddc9] px-5 py-4 text-xs text-gray-600 text-center tracking-wide">Tus datos están seguros. Transacción cifrada (demo).</div>

              {error && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 text-center">{error}</div>}

              <div className="flex items-center justify-center gap-4 pt-4">
                <button type="button" onClick={() => router.push("/carrito")} className="border border-[#d6c9b0] rounded-lg px-8 py-3 text-base font-medium tracking-wide hover:bg-[#f5efe2] transition-colors">ATRÁS</button>
                <button type="submit" disabled={loading} className="bg-[#c0a256] hover:bg-[#b09148] text-white font-semibold rounded-lg px-8 py-3 text-base tracking-wide disabled:opacity-60 shadow-sm transition-colors">{loading ? "Procesando..." : `PAGAR ${montoFormateado(total)}`}</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );

}
