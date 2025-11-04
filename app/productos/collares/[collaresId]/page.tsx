import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import ClientImageZoom from '@/app/components/ClientImageZoom';

// --- Datos de Ejemplo (Deben coincidir) ---
const collaresData = [
  { id: 'collar-estrella', nombre: 'Collar Estrella Dorada', precio: 1700, imagen: '/Images/collar.jpg', rating: 5, descripcion: 'Un collar dorado con un dije de estrella y brillantes.' },
  { id: 'collar-perla', nombre: 'Collar Perla Elegante', precio: 2800, imagen: '/Images/collarPerla.jpg', rating: 5, descripcion: 'Elegante y minimalista collar con una perla central.' },
  { id: 'collar-corazon-perla', nombre: 'Collar Perlas y Corazón', precio: 2100, imagen: '/Images/collares.png', rating: 4, descripcion: 'Collar de perlas con un dije central de corazón.' },
  { id: 'cadena-plata', nombre: 'Cadena Fina de Plata', precio: 1300, imagen: '/Images/collares qhpt.png', rating: 5, descripcion: 'Una cadena clásica y versátil de plata fina, perfecta para cualquier ocasión.' }
];

const getCollarById = (id: string) => {
  return collaresData.find(c => c.id === id);
};

export async function generateStaticParams() {
  // usar la clave que coincide con el nombre del folder: collaresId
  return collaresData.map((collar) => ({
    collaresId: collar.id,
  }));
}
// --- Fin de Datos ---

const detailStyles: Record<string, CSSProperties> = {
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

export default function CollarDetallePage({ params }: { params: { collaresId: string } }) {
  const { collaresId } = params;
  const collar = getCollarById(collaresId);

  if (!collar) {
    notFound();
  }

  return (
    <>
      <Header showLoginButton={true} />
      <main className="container section">
        
        <Link href="/productos/collares" style={detailStyles.backLink}>
          &larr; Volver a todos los collares
        </Link>

        <div style={detailStyles.wrapper}>
          
          <div style={detailStyles.imageCol}>
            <ClientImageZoom src={collar.imagen} alt={collar.nombre} />
          </div>
          
          <div style={detailStyles.infoCol}>
            <h1 style={detailStyles.title}>{collar.nombre}</h1>
            <p style={detailStyles.price}>
              ${collar.precio.toLocaleString('es-MX')}
            </p>
            <p style={detailStyles.description}>{collar.descripcion}</p>
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