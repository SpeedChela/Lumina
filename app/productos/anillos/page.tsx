import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../productos.module.css'; // Importamos los estilos

// --- Datos de Ejemplo ---
// (Usaré las imágenes que ya subiste para llenar la cuadrícula)
const anillosData = [
  {
    id: 'anillo-floral',
    nombre: 'Ring Silver',
    precio: 1800,
    imagen: '/Images/anillos.webp', // Imagen que subiste
    rating: 5,
  },
  {
    id: 'anillo-corazon',
    nombre: 'Hiper Diamond Ring',
    precio: 4500,
    imagen: '/Images/rncda.png', // Imagen que subiste
    rating: 5,
  },
  {
    id: 'heart-ring',
    nombre: 'Heart Ring',
    precio: 2500,
    imagen: '/Images/anillos.webp', // Imagen repetida como ejemplo
    rating: 5,
  },
  {
    id: 'clavo-ring',
    nombre: 'Clavo Ring',
    precio: 2500,
    imagen: '/Images/rncda.png', // Imagen repetida como ejemplo
    rating: 5,
  },
  {
    id: 'two-tones-ring',
    nombre: 'Two Tones Ring',
    precio: 1600,
    imagen: '/Images/anillos.webp', // Imagen repetida como ejemplo
    rating: 5,
  },
  {
    id: 'emerald-ring',
    nombre: 'Emerald Ring',
    precio: 3000,
    imagen: '/Images/rncda.png', // Imagen repetida como ejemplo
    rating: 5,
  }
];
// --- Fin de Datos ---

export default function AnillosPage() {
  
  // Función para renderizar estrellas como en la imagen
  const renderStars = (rating: number) => {
    return '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(rating);
  };

  return (
    <>
      <Header showLoginButton={true} />
      <main className="container section">
        
        <h1 className={styles.pageTitle}>Anillos Lumina</h1>

        <div className={styles.productGrid}>
          {anillosData.map((anillo) => (
            <div key={anillo.id} className={styles.productCard}>
              {/* La imagen es un enlace al detalle */}
              <Link href={`/productos/anillos/${anillo.id}`}>
                <div className={styles.productImageWrapper}>
                  <Image
                    src={anillo.imagen}
                    alt={anillo.nombre}
                    width={300}
                    height={300}
                    className={styles.productImage}
                  />
                </div>
              </Link>
              <h2 className={styles.productName}>{anillo.nombre}</h2>
              <p className={styles.productPrice}>
                ${anillo.precio.toLocaleString('es-MX')}
              </p>
              <div className={styles.productRating}>
                {renderStars(anillo.rating)}
              </div>
              {/* El link "Comprar" también lleva al detalle */}
              <Link href={`/productos/anillos/${anillo.id}`} className={styles.productLink}>
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