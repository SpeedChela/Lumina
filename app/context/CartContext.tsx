"use client";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  color?: string;
  size?: string;
  categoria?: string;
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
  const [userId, setUserId] = useState<string | null>(null);
  const prevUserRef = useRef<string | null | undefined>(undefined);

  // Helper to compute storage key per user (guest vs user)
  const storageKey = (uid?: string | null) => (uid ? `lumina:cart:${uid}` : `lumina:cart:guest`);

  // Normalize items: merge duplicates by variant (id + color + size) and sum qty
  const normalizeItems = (arr: CartItem[] | undefined | null) => {
    if (!Array.isArray(arr)) return [] as CartItem[];
    const map = new Map<string, CartItem>();
    for (const it of arr) {
      const key = `${it.id}::${it.color ?? ""}::${it.size ?? ""}`;
      const existing = map.get(key);
      if (existing) {
        existing.qty = (existing.qty || 0) + (it.qty || 0);
      } else {
        map.set(key, { ...it, qty: it.qty || 0 });
      }
    }
    return Array.from(map.values());
  };

  // Fetch session user to determine storage key
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/sessionUser");
        const data = await res.json();
        if (!mounted) return;
        setUserId(data?.user?.uid ?? null);
      } catch {
        if (!mounted) return;
        setUserId(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Load cart for current userId (runs on mount and when userId changes)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(userId));
      if (raw) setItems(normalizeItems(JSON.parse(raw)));
      else setItems([]);
    } catch {
      setItems([]);
    }
  }, [userId]);

  // When userId changes, migrate guest cart into user cart (login) or move user cart to guest (logout)
  useEffect(() => {
    const prev = prevUserRef.current;
    // guest -> user (merge)
    if (!prev && userId) {
      try {
        const guestRaw = localStorage.getItem(storageKey(null)) || "[]";
        const userRaw = localStorage.getItem(storageKey(userId)) || "[]";
        const guest = JSON.parse(guestRaw) as CartItem[];
        const user = JSON.parse(userRaw) as CartItem[];

        const merged = [...user];
        guest.forEach((g) => {
          const i = merged.findIndex((p) => sameVariant(p, g));
          if (i >= 0) merged[i] = { ...merged[i], qty: (merged[i].qty || 0) + (g.qty || 0) };
          else merged.push({ ...g });
        });
        const mergedNormalized = normalizeItems(merged as CartItem[]);
        localStorage.setItem(storageKey(userId), JSON.stringify(mergedNormalized));
        localStorage.removeItem(storageKey(null));
        setItems(mergedNormalized as any);
        // Persist merged cart to server
        (async () => {
          try {
            await fetch("/api/cart", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items: merged }),
            });
          } catch (e) {
            // ignore server errors for now
          }
        })();
      } catch {
        // ignore
      }
    }

    // user -> guest (logout): save current user cart to guest key
    if (prev && !userId) {
      try {
        const userRaw = localStorage.getItem(storageKey(prev)) || "[]";
        localStorage.setItem(storageKey(null), userRaw);
        setItems(normalizeItems(JSON.parse(userRaw)));
      } catch {}
    }

    prevUserRef.current = userId;
  }, [userId]);

  // When a user logs in, try to sync with server-side cart and merge
  useEffect(() => {
    if (!userId) return;
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/cart");
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        const serverItems = (data?.items as CartItem[]) || [];
        // Merge serverItems with current local items (server wins duplicates by summing)
        const localRaw = localStorage.getItem(storageKey(userId)) || "[]";
        const localItems = JSON.parse(localRaw) as CartItem[];
        const merged = [...serverItems];
        localItems.forEach((g) => {
          const i = merged.findIndex((p) => sameVariant(p, g));
          if (i >= 0) merged[i] = { ...merged[i], qty: (merged[i].qty || 0) + (g.qty || 0) };
          else merged.push({ ...g });
        });
        const mergedNormalized = normalizeItems(merged as CartItem[]);
        localStorage.setItem(storageKey(userId), JSON.stringify(mergedNormalized));
        setItems(mergedNormalized);
        // Persist merged back to server to ensure server has the union
        try {
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: merged }),
          });
        } catch {}
      } catch (e) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, [userId]);

  // Sync local changes to server when user is logged in
  useEffect(() => {
    if (!userId) return;
    try {
      (async () => {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: normalizeItems(items) }),
        });
      })();
    } catch {}
  }, [items, userId]);

  // Guardar en localStorage en la key correspondiente
  useEffect(() => {
    try {
      localStorage.setItem(storageKey(userId), JSON.stringify(normalizeItems(items)));
    } catch {}
  }, [items, userId]);

  // Ensure items are normalized (deduplicated) after any change coming from actions
  useEffect(() => {
    const normalized = normalizeItems(items);
    const a = JSON.stringify(normalized);
    const b = JSON.stringify(items);
    if (a !== b) {
      setItems(normalized);
    }
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