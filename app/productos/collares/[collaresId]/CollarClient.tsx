"use client";
import ClientImageZoom from "@/components/ClientImageZoom";
import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";

type Collar = {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  rating: number;
  descripcion: string;
};

export default function CollarClient({ collar }: { collar: Collar }) {
  const router = useRouter();
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem({ id: collar.id, name: collar.nombre, price: collar.precio }, 1);
  }

  function handleBuyNow() {
    addItem({ id: collar.id, name: collar.nombre, price: collar.precio }, 1);
    router.push("/pago");
  }

  return (
    <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 400px", background: "#f8f8f8", borderRadius: "12px", overflow: "hidden" }}>
        <ClientImageZoom src={collar.imagen} alt={collar.nombre} />
      </div>
      <div style={{ flex: "1 1 400px", paddingTop: "1rem" }}>
        <h1 style={{ fontSize: "2.6rem", fontWeight: 700, margin: "0 0 1rem" }}>{collar.nombre}</h1>
        <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--brand)", margin: "1rem 0" }}>
          ${collar.precio.toLocaleString("es-MX")}
        </p>
        <p style={{ fontSize: "1.05rem", color: "#444", lineHeight: 1.6, margin: "1rem 0 2rem" }}>{collar.descripcion}</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button onClick={handleAddToCart} style={{ padding: "0.9rem 2.1rem", background: "#f0d58c", borderRadius: "10px", fontWeight: 600 }}>
            Añadir al Carrito
          </button>
          <button onClick={handleBuyNow} style={{ padding: "0.9rem 2.1rem", background: "#111", color: "#fff", borderRadius: "10px", fontWeight: 600 }}>
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
}