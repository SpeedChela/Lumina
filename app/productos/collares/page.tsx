import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../productos.module.css'; // Reutilizamos los estilos

// --- Datos de Ejemplo para Collares ---
// (Usando las imágenes que subiste)
const collaresData = [
  {
    id: 'collar-estrella',
    nombre: 'Collar Estrella Dorada',
    precio: 1700,
    imagen: '/Images/collar.jpg', // Imagen que subiste
    rating: 5,
  },
  {
    id: 'collar-perla',
    nombre: 'Collar Perla Elegante',
    precio: 2800,
    imagen: '/Images/collarPerla.jpg', // Imagen que subiste
    rating: 5,
  },
  {
    id: 'collar-corazon-perla',
    nombre: 'Collar Perlas y Corazón',
    precio: 2100,
    imagen: '/Images/collares.png', // Imagen que subiste
    rating: 4,
  },
  {
    id: 'cadena-plata',
    nombre: 'Cadena Fina de Plata',
    precio: 1300,
    imagen: '/Images/collares qhpt.png', // Imagen que subiste
    rating: 5,
  }
];
// --- Fin de Datos ---

export default function CollaresPage() {
  
  const renderStars = (rating: number) => {
    return '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(rating);
  };

  return (
    <>
      <Header showLoginButton={true} />
      <main className="container section">
        
        <h1 className={styles.pageTitle}>Collares Lumina</h1>

        <div className={styles.productGrid}>
          {collaresData.map((collar) => (
            <div key={collar.id} className={styles.productCard}>
              <Link href={`/productos/collares/${collar.id}`}>
                <div className={styles.productImageWrapper}>
                  <Image
                    src={collar.imagen}
                    alt={collar.nombre}
                    width={300}
                    height={300}
                    className={styles.productImage}
                  />
                </div>
              </Link>
              <h2 className={styles.productName}>{collar.nombre}</h2>
              <p className={styles.productPrice}>
                ${collar.precio.toLocaleString('es-MX')}
              </p>
              <div className={styles.productRating}>
                {renderStars(collar.rating)}
              </div>
              <Link href={`/productos/collares/${collar.id}`} className={styles.productLink}>
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