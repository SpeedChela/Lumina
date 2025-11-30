
import React from "react";
import Link from "next/link";
import styles from "./productos.module.css";
import ProductsClient, { Product } from "./ProductsClient";
import { anillosData } from "../../data/anillos";
import { collaresData } from "../../data/collares";
import { pulserasData } from "../../data/pulseras";

export default function Page() {
	const anillos: Product[] = anillosData.map((a) => ({ ...a, categoria: "Anillos" }));
	const collares: Product[] = collaresData.map((c) => ({ ...c, categoria: "Collares" }));

	const pulseras: Product[] = pulserasData.map((p) => ({ ...p, categoria: "Pulseras" }));

	const products: Product[] = [...anillos, ...collares, ...pulseras];

	return (
		<main style={{ padding: "2rem 1rem" }}>
			<div style={{ marginBottom: 16 }}>
				<Link href="/" className={styles.backBtn}>
					← Volver al inicio
				</Link>
			</div>

			<ProductsClient products={products} />
		</main>
	);
}
