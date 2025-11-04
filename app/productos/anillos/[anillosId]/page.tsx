import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import ClientImageZoom from '@/app/components/ClientImageZoom'; // <-- añadido

// --- Datos de Ejemplo (Deben coincidir con los de la página anterior) ---
// En una app real, esto vendría de una base de datos
const anillosData = [
  { id: 'anillo-floral', nombre: 'Ring Silver', precio: 1800, imagen: '/Images/anillos.webp', rating: 5, descripcion: 'Un elegante anillo de plata con un diseño floral y brillantes.' },
  { id: 'anillo-corazon', nombre: 'Hiper Diamond Ring', precio: 4500, imagen: '/Images/rncda.png', rating: 5, descripcion: 'Un deslumbrante anillo con un diamante en forma de corazón.' },
  { id: 'heart-ring', nombre: 'Heart Ring', precio: 2500, imagen: '/Images/anillos.webp', rating: 5, descripcion: 'Un delicado anillo con diseño floral en oro.' },
  { id: 'clavo-ring', nombre: 'Clavo Ring', precio: 2500, imagen: '/Images/rncda.png', rating: 5, descripcion: 'Un diseño moderno y audaz en plata pura.' },
  { id: 'two-tones-ring', nombre: 'Two Tones Ring', precio: 1600, imagen: '/Images/anillos.webp', rating: 5, descripcion: 'Anillo de dos oros con un brillante central.' },
  { id: 'emerald-ring', nombre: 'Emerald Ring', precio: 3000, imagen: '/Images/rncda.png', rating: 5, descripcion: 'Un clásico anillo con un diamante de corte corazón.' }
];

// Función para encontrar el anillo por ID
const getAnilloById = (id: string) => {
  return anillosData.find(anillo => anillo.id === id);
};

// Genera las rutas estáticas en build time
export async function generateStaticParams() {
  // usar la clave que coincide con el nombre del folder: anillosId
  return anillosData.map((anillo) => ({
    anillosId: anillo.id,
  }));
}
// --- Fin de Datos ---


// Estilos en línea para la página de detalle (tipados con CSSProperties para evitar "as '...'" )
const detailStyles: {
  wrapper: CSSProperties;
  imageCol: CSSProperties;
  image: CSSProperties;
  infoCol: CSSProperties;
  title: CSSProperties;
  price: CSSProperties;
  description: CSSProperties;
  button: CSSProperties;
  backLink: CSSProperties;
} = {
  wrapper: { display: 'flex', gap: '2.5rem', flexWrap: 'wrap' },
  imageCol: { flex: '1 1 400px', background: '#f8f8f8', borderRadius: '12px', overflow: 'hidden' },
  image: { width: '100%', height: 'auto', aspectRatio: '1 / 1', objectFit: 'cover' },
  infoCol: { flex: '1 1 400px', paddingTop: '1rem' },
  title: { fontSize: '2.8rem', fontWeight: 700, margin: '0 0 1rem' },
  price: { fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--brand)', margin: '1rem 0' },
  description: { fontSize: '1.1rem', color: '#444', lineHeight: 1.6, margin: '1rem 0 2rem' },
  button: { padding: '1rem 2.5rem', fontSize: '1.1rem' },
  backLink: { display: 'inline-block', margin: '0 0 2rem', color: '#555', textDecoration: 'none' }
};


export default function AnilloDetallePage({ params }: { params: { anillosId: string } }) {
  const { anillosId } = params;
  const anillo = getAnilloById(anillosId);

  if (!anillo) {
    notFound();
  }

  return (
    <>
      <Header showLoginButton={true} />
      <main className="container section">
        
        <Link href="/productos/anillos" style={detailStyles.backLink}>
          &larr; Volver a todos los anillos
        </Link>

        <div style={detailStyles.wrapper}>
          
          {/* sustituido Image por el componente cliente reutilizable */}
          <div style={detailStyles.imageCol}>
            <ClientImageZoom src={anillo.imagen} alt={anillo.nombre} />
          </div>
          
          <div style={detailStyles.infoCol}>
            <h1 style={detailStyles.title}>{anillo.nombre}</h1>
            <p style={detailStyles.price}>
              ${anillo.precio.toLocaleString('es-MX')}
            </p>
            <p style={detailStyles.description}>{anillo.descripcion}</p>
            <button className="btn" style={detailStyles.button}>
              Añadir al Carrito
            </button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}