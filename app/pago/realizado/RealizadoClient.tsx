"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

function formatCurrency(n?: number, currency = "MXN") {
  if (!n) return "$0";
  try {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency }).format(n / 100);
  } catch {
    return `$${(n / 100).toFixed(2)}`;
  }
}

type LineItem = { description?: string; quantity?: number; amount_total?: number; currency?: string };
type VerifyData = {
  ok: boolean;
  paid: boolean;
  demo?: boolean;
  id?: string;
  amount_total?: number;
  currency?: string;
  items?: LineItem[];
};

export default function RealizadoClient() {
  const search = useSearchParams();
  const router = useRouter();
  const { clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VerifyData | null>(null);

  useEffect(() => {
    const sessionId = search?.get("session_id");
    const mode = search?.get("mode");
    if (!sessionId && !mode) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        if (sessionId) {
          const res = await fetch(`/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`);
          const json = await res.json();
          if (json?.ok && json?.paid) {
            setData(json);
            try { clear(); } catch {}
          } else {
            setError("No se confirmó el pago.");
          }
        } else if (mode === "demo") {
          setData({ ok: true, paid: true, demo: true, id: `demo-${Date.now()}` });
          try { clear(); } catch {}
        }
      } catch {
        setError("Error al obtener detalles del pago.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [search, clear]);

  return (
    <div className="bg-white/80 border border-[#e7ddc9] rounded-2xl p-8 shadow-sm text-center">
      {loading ? (
        <div>Verificando pago...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : data ? (
        <div>
          <h1 className="text-2xl font-bold mb-3">¡Pago recibido!</h1>
          {data.demo && <p className="text-sm text-gray-600 mb-4">Modo demo — no se realizó ningún cargo.</p>}
          {data.id && <p className="text-sm text-gray-700">Orden: <strong>{data.id}</strong></p>}
          {data.amount_total && (
            <p className="mt-4 text-lg">Total: <strong className="text-[#c0a256]">{formatCurrency(data.amount_total, (data.currency || 'MXN').toUpperCase())}</strong></p>
          )}

          {Array.isArray(data.items) && data.items.length > 0 && (
            <div className="mt-6 text-left max-w-xl mx-auto">
              <h3 className="font-semibold mb-2">Resumen</h3>
              <ul className="space-y-2">
                {data.items.map((it: LineItem, idx: number) => (
                  <li key={idx} className="flex justify-between">
                    <span>{it.description ?? 'Producto' } x{it.quantity}</span>
                    <span>{formatCurrency(it.amount_total, (it.currency||data.currency||'MXN').toUpperCase())}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <button onClick={() => router.push('/')} className="rounded-lg bg-[#c0a256] px-6 py-3 text-white font-semibold">Volver al inicio</button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-lg">Sin información de pago.</h2>
          <div className="mt-6">
            <button onClick={() => router.push('/')} className="rounded-lg border border-[#d6c9b0] px-6 py-3">Volver</button>
          </div>
        </div>
      )}
    </div>
  );
}
