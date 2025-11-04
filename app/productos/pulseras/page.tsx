import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../productos.module.css'; // Reutilizamos los estilos

// --- Datos de Ejemplo para Pulseras ---
// (Usando las imágenes que subiste)
const pulserasData = [
  {
    id: 'set-pulseras-oro',
    nombre: 'Set Pulseras de Oro',
    precio: 2200,
    imagen: '/Images/pulseras.webp', // Imagen que subiste
    rating: 5,
  },
  {
    id: 'pulsera-dije-corazon',
    nombre: 'Pulsera Dije Corazón',
    precio: 1200,
    imagen: '/Images/pulseras.jpg', // Imagen que subiste
    rating: 5,
  },
  {
    id: 'pulsera-moderna',
    nombre: 'Pulsera Dorada Moderna',
    precio: 1500,
    imagen: '/Images/pulseras.png', // Imagen que subiste
    rating: 4,
  }
];
// --- Fin de Datos ---

export default function PulserasPage() {
  
  const renderStars = (rating: number) => {
    return '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(rating);
  };

  return (
    <>
      <Header showLoginButton={true} />
      <main className="container section">
        
        <h1 className={styles.pageTitle}>Pulseras Lumina</h1>

        <div className={styles.productGrid}>
          {pulserasData.map((pulsera) => (
            <div key={pulsera.id} className={styles.productCard}>
              <Link href={`/productos/pulseras/${pulsera.id}`}>
                <div className={styles.productImageWrapper}>
                  <Image
                    src={pulsera.imagen}
                    alt={pulsera.nombre}
                    width={300}
                    height={300}
                    className={styles.productImage}
                  />
                </div>
              </Link>
              <h2 className={styles.productName}>{pulsera.nombre}</h2>
              <p className={styles.productPrice}>
                ${pulsera.precio.toLocaleString('es-MX')}
              </p>
              <div className={styles.productRating}>
                {renderStars(pulsera.rating)}
              </div>
              <Link href={`/productos/pulseras/${pulsera.id}`} className={styles.productLink}>
                Comprar
              </Link>
            </div>
          ))}
        </div>

      </main>
      <Footer />
    </>
  );
}