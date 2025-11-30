"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./productos.module.css";

export type Product = {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  rating: number;
  descripcion: string;
  categoria: string;
};

function getProductHref(p: Product) {
  const cat = (p.categoria || "").toLowerCase();
  if (cat.includes("anill")) return `/productos/anillos/${encodeURIComponent(p.id)}`;
  if (cat.includes("collar")) return `/productos/collares/${encodeURIComponent(p.id)}`;
  return `/productos/${encodeURIComponent(p.id)}`;
}

export default function ProductsClient({ products }: { products: Product[] }) {
  const [categoria, setCategoria] = useState<string>("Todas");

  const categorias = useMemo(() => {
    const set = new Set<string>(products.map((p) => p.categoria));
    return ["Todas", ...Array.from(set)];
  }, [products]);

  const filtrados = useMemo(() => {
    return categoria === "Todas"
      ? products
      : products.filter((p) => p.categoria === categoria);
  }, [products, categoria]);


  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <p className="text-sm text-slate-400">Tienda</p>
          <h1 className="text-3xl font-bold text-white">Catálogo de productos</h1>
        </div>

        <div className={styles.filterWrapper}>
          <label htmlFor="categoria" style={{ marginRight: 8, fontWeight: 600, color: "#94a3b8" }}>Filtrar:</label>
          <select id="categoria" className={styles.filterSelect} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.productGrid}>
        {filtrados.map((p) => (
          <article key={p.id} className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src={p.imagen} alt={p.nombre} className={styles.productImage} width={320} height={240} />
            </div>
            <h3 className={styles.productName}>{p.nombre}</h3>
            <div className={styles.productPrice}>${p.precio.toLocaleString("es-AR")}</div>
            <div className={styles.productRating}><span className={styles.iconSmall}>⭐</span> <span className={styles.iconSmall}>{p.rating}</span></div>
            <p style={{ color: "#666", fontSize: 14 }}>{p.descripcion}</p>
            <div style={{ marginTop: 12 }}>
              <Link href={getProductHref(p)} className={styles.productButton}>
                Ver producto
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
