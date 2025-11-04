import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import ClientImageZoom from '@/app/components/ClientImageZoom';

// --- Datos de Ejemplo (Deben coincidir) ---
const pulserasData = [
  { id: 'set-pulseras-oro', nombre: 'Set Pulseras de Oro', precio: 2200, imagen: '/Images/pulseras.webp', rating: 5, descripcion: 'Set de tres pulseras de oro para combinar y crear un look único.' },
  { id: 'pulsera-dije-corazon', nombre: 'Pulsera Dije Corazón', precio: 1200, imagen: '/Images/pulseras.jpg', rating: 5, descripcion: 'Encantadora pulsera con dijes de corazón y llave, ideal para regalar.' },
  { id: 'pulsera-moderna', nombre: 'Pulsera Dorada Moderna', precio: 1500, imagen: '/Images/pulseras.png', rating: 4, descripcion: 'Un look moderno y sofisticado con estas pulseras de eslabones dorados.' }
];

const getPulseraById = (id: string) => {
  return pulserasData.find(p => p.id === id);
};

export async function generateStaticParams() {
  // usar la clave que coincide con el nombre del folder: pulserasId
  return pulserasData.map((pulsera) => ({
    pulserasId: pulsera.id,
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

export default function PulseraDetallePage({ params }: { params: { pulserasId: string } }) {
  const { pulserasId } = params;
  const pulsera = getPulseraById(pulserasId);

  if (!pulsera) {
    notFound();
  }

  return (
    <>
      <Header showLoginButton={true} />
      <main className="container section">
        
        <Link href="/productos/pulseras" style={detailStyles.backLink}>
          &larr; Volver a todas las pulseras
        </Link>

        <div style={detailStyles.wrapper}>
          
          <div style={detailStyles.imageCol}>
            <ClientImageZoom src={pulsera.imagen} alt={pulsera.nombre} />
          </div>
          
          <div style={detailStyles.infoCol}>
            <h1 style={detailStyles.title}>{pulsera.nombre}</h1>
            <p style={detailStyles.price}>
              ${pulsera.precio.toLocaleString('es-MX')}
            </p>
            <p style={detailStyles.description}>{pulsera.descripcion}</p>
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