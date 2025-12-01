"use client";

import React, { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

function currency(n: number) {
  return `$${n.toLocaleString("es-AR")}`;
}

export default function CartClient() {
  const { items, updateQty, removeItem, clear, subtotal } = useCart();
  const [loading, setLoading] = useState(false);

  const shipping = useMemo(() => (subtotal > 0 ? 200 : 0), [subtotal]);
  const total = subtotal + shipping;

  async function handleCheckout() {
    if (items.length === 0) return alert("El carrito está vacío");
    setLoading(true);
    try {
      const payload = items.map((it) => ({ id: it.id, nombre: it.name, precio: it.price, cantidad: it.qty }));
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: payload }),
      });
      const data = await res.json();
      if (data?.url) {
        // redirect to provider
        window.location.href = data.url;
        return;
      }
      // fallback: clear cart and show a confirmation
      clear();
      alert(data?.message ?? "Pago simulado: compra realizada");
    } catch (e) {
      console.error(e);
      alert("Error al procesar pago");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ fontSize: 28, margin: "8px 0 18px" }}>Tu carrito</h2>

      {items.length === 0 ? (
        <div style={{ padding: 24, background: "#fff", borderRadius: 10 }}>Tu carrito está vacío.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div>
            {items.map((it) => (
              <div key={it.id} style={{ display: "flex", gap: 12, alignItems: "center", background: "#fff", padding: 12, borderRadius: 8, marginBottom: 12 }}>
                <div style={{ width: 84, height: 84, borderRadius: 8, overflow: "hidden", background: "#f6f6f6" }}>
                  {it.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.image} alt={it.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : null}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{it.name}</div>
                  <div style={{ color: "#666", fontSize: 14 }}>{currency(it.price)}</div>
                  <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
                    <button onClick={() => updateQty(it.id, it.qty - 1)}>-</button>
                    <input value={it.qty} onChange={(e) => updateQty(it.id, Number(e.target.value || 1))} style={{ width: 48, textAlign: "center" }} />
                    <button onClick={() => updateQty(it.id, it.qty + 1)}>+</button>
                    <button onClick={() => removeItem(it.id)} style={{ marginLeft: 12, color: "#b91c1c" }}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside style={{ background: "#fff", padding: 16, borderRadius: 8, height: "fit-content" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div>Subtotal</div>
              <div>{currency(subtotal)}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div>Envío</div>
              <div>{shipping === 0 ? "—" : currency(shipping)}</div>
            </div>
            <div style={{ borderTop: "1px solid #eee", paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: 12 }}>
              <div>Total</div>
              <div>{currency(total)}</div>
            </div>
            <button onClick={handleCheckout} disabled={loading} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, background: "#f2c94c", border: "none", fontWeight: 800 }}>
              {loading ? "Procesando..." : "Pagar"}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
