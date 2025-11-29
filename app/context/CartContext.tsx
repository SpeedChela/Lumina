"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  color?: string;
  size?: string;
  qty: number;
};

type AddItemInput = Omit<CartItem, "qty">;

type CartContextType = {
  items: CartItem[];
  addItem: (item: AddItemInput, qty?: number) => void;
  removeItem: (id: string, opts?: { color?: string; size?: string }) => void;
  updateQty: (id: string, qty: number, opts?: { color?: string; size?: string }) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("lumina:cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("lumina:cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const sameVariant = (a: AddItemInput | CartItem, b: AddItemInput | CartItem) =>
    a.id === b.id && a.color === b.color && a.size === b.size;

  const addItem = (item: AddItemInput, qty = 1) =>
    setItems((prev) => {
      const i = prev.findIndex((p) => sameVariant(p, item));
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, { ...item, qty }];
    });

  const removeItem = (id: string, opts?: { color?: string; size?: string }) =>
    setItems((prev) =>
      prev.filter((p) => !(p.id === id && p.color === opts?.color && p.size === opts?.size))
    );

  const updateQty = (id: string, qty: number, opts?: { color?: string; size?: string }) =>
    setItems((prev) =>
      prev.map((p) =>
        p.id === id && p.color === opts?.color && p.size === opts?.size
          ? { ...p, qty: Math.max(1, qty) }
          : p
      )
    );

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((a, i) => a + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((a, i) => a + i.qty * i.price, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}