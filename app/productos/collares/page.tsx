import Link from "next/link";
import { collaresData } from "@/data/collares";
import styles from "./collares.module.css";
import BackButtonClient from "./BackButtonClient";

export default function CollaresListadoPage() {
  return (
    <main className="container section">
      <div style={{ marginBottom: 12 }}>
        <BackButtonClient />
      </div>
      <h1 className={styles.listHeading}>Collares Lumina</h1>
      <div className={styles.cardsGrid}>
        {collaresData.map(c => (
          <div key={c.id} className={styles.productCard}>
            <div className={styles.imageWrap}>
              <img src={c.imagen} alt={c.nombre} className={styles.cardImage} />
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>{c.nombre}</h2>
              <p className={styles.cardPrice}>${c.precio.toLocaleString("es-MX")}</p>
              <div className={styles.cardRating}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < c.rating ? `${styles.star} ${styles.filled}` : styles.star}>★</span>
                ))}
              </div>
              <div className={styles.cardActions}>
                <Link href={`/productos/collares/${c.id}`} className={styles.detailBtn}>DETALLE</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}