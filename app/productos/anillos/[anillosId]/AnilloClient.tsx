"use client";
import ClientImageZoom from "@/components/ClientImageZoom";
import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";

type Anillo = {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  rating: number;
  descripcion: string;
};

export default function AnilloClient({ anillo }: { anillo: Anillo }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { push } = useToast();

  function handleAddToCart() {
    addItem({ id: anillo.id, name: anillo.nombre, price: anillo.precio, image: anillo.imagen, categoria: "Anillos" }, 1);
    push("Añadido al carrito");
  }

  function handleBuyNow() {
    addItem({ id: anillo.id, name: anillo.nombre, price: anillo.precio, image: anillo.imagen, categoria: "Anillos" }, 1);
    push("Añadido al carrito");
    router.push("/carrito");
  }

  return (
    <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 400px", background: "#f8f8f8", borderRadius: "12px", overflow: "hidden" }}>
        <ClientImageZoom src={anillo.imagen} alt={anillo.nombre} />
      </div>
      <div style={{ flex: "1 1 400px", paddingTop: "1rem" }}>
        <h1 style={{ fontSize: "2.6rem", fontWeight: 700, margin: "0 0 1rem" }}>{anillo.nombre}</h1>
        <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--brand)", margin: "1rem 0" }}>
          ${anillo.precio.toLocaleString("es-MX")}
        </p>
        <p style={{ fontSize: "1.05rem", color: "#444", lineHeight: 1.6, margin: "1rem 0 2rem" }}>{anillo.descripcion}</p>
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