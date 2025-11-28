"use client";
import Link from "next/link";
import { useCart } from "../app/context/CartContext";

export default function CartButton() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="cartLink" aria-label="Ir al carrito">
      <span className="cartIcon">🛒</span>
      {count > 0 && <span className="cartBadge">{count}</span>}
    </Link>
  );
}