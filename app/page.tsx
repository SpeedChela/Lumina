import Image from "next/image"; // Importa el componente optimizado de imágenes de Next.js
import Hero from "./components/Hero"; // Importa el componente Hero (puedes quitarlo si no lo usas)
import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "next/link";
/* 
  Componente principal de la página Home.
  Estructura la página con header, main (contenido principal) y footer.
*/

/*namas ando viendo si ya quedo JAJAJAJA*/
export default function Home() {
  return (
    <>
     <Header showLoginButton={true} />
      {/* Contenido principal */}
      <main className="container">
        {/* Sección principal del héroe (hero section) */}
        <section className="section hero-flex" aria-labelledby="hero-title">
          {/* Texto del héroe alineado a la izquierda */}
          <div className="hero-text">
            <h3>Coleccion</h3>
            <h1 id="hero-title">Collares que hablan por ti</h1>
            <h2>Cada detalle refleja elegancia cada,</h2>
            <h2>pieza esta hecha para contar una historia</h2>
            <p><a className="btn btn:hover">Ver coleccion</a></p> {/* Botón de llamada a la acción */}
          </div>
          {/* Imagen del héroe alineada a la derecha */}
          <div className="hero-img">
            <Image
              src="/Images/collar.jpg" // Imagen principal de la sección
              alt="Collar elegante de la colección"
              width={300}
              height={200}
              style={{ maxWidth: "300px", width: "100%", margin: "1rem 0", borderRadius: "12px" }}
            />
          </div>  
        </section> 

        {/* Componente Hero importado (puedes quitarlo si no lo usas) */}
        <Hero />

        {/* Sección de características de productos */}
        <section className="section" aria-labelledby="feat-title">
          <div className="container">
            <div className="grid" role="list">
              {/* Tarjeta 1: Anillos */}
              <article className="container section center card col-4 col-md-6 col-sm-12" role="listitem">
                <Image
                  src="/Images/anillos.webp"
                  alt="Collar elegante de la colección"
                  width={300}
                  height={200}
                  style={{ maxWidth: "300px", width: "100%", margin: "1rem 0", borderRadius: "12px" }}
                />
                <h3 className="h3">Anillos</h3>
                <p>Descubre anillos diseñados para cada momento de tu vida.
                   Desde estilos minimalistas hasta piezas con piedras que roban miradas,
                    encuentra el complemento perfecto para expresar tu personalidad.</p>
                <p><Link href="/productos/anillos" className="btn">Comprar</Link></p>
              </article>
              {/* Tarjeta 2: Pulseras */}
              <article className="container section center card col-4 col-md-6 col-sm-12" role="listitem">
                <Image
                  src="/Images/pulseras.jpg"
                  alt="Collar elegante de la colección"
                  width={300}
                  height={200}
                  style={{ maxWidth: "300px", width: "100%", margin: "1rem 0", borderRadius: "12px" }}
                />
                <h3 className="h3">Pulseras</h3>
                <p>Detalles que marcan la diferencia. Pulseras versátiles y sofisticadas,
                   ideales para llevar solas o en combinación, creando un estilo auténtico
                    y lleno de carácter.</p>
                <p><Link href="/productos/pulseras" className="btn">Comprar</Link></p>
              </article>
              {/* Tarjeta 3: Collares */}
              <article className="container section center card col-4 col-md-6 col-sm-12" role="listitem">
                <Image
                  src="/Images/collarPerla.jpg"
                  alt="Collar elegante de la colección"
                  width={300}
                  height={200}
                  style={{ maxWidth: "300px", width: "100%", margin: "1rem 0", borderRadius: "12px" }}
                />
                <h3 className="h3">Collares</h3>
                <p>Collares únicos que iluminan tu estilo. Desde cadenas delicadas hasta
                   diseños con brillo impactante, cada pieza está pensada para realzar tu
                    elegancia y acompañarte en cualquier ocasión</p>
                <p><Link href="/productos/collares" className="btn">Comprar</Link></p>
              </article>
            </div>
          </div>
        </section>

          {/* Sección FAQ estilo acordeón */}
        <section className="faq section" aria-labelledby="faq-title">
          <h2 id="faq-title">Preguntas Frecuentes</h2>
          <div className="container">
            <div className="faq-list summary">
              {/* Pregunta 1 */}
              <details>
                <summary>¿Cómo puedo realizar una compra?</summary>
                <p>
                  Para realizar una compra, simplemente navega por nuestra colección, selecciona los productos que te gusten y agrégalos a tu carrito. Luego, sigue el proceso de pago para completar tu compra.
                </p>
              </details>
              {/* Pregunta 2 */}
              <details>
                <summary>¿Ofrecen envíos internacionales?</summary>
                <p>
                  Sí, ofrecemos envíos internacionales a la mayoría de los países. Los costos y tiempos de envío pueden variar según la ubicación. Consulta nuestra página de envíos para más detalles.
                </p>
              </details>
              {/* Pregunta 3 */}
              <details>
                <summary>¿Cuál es su política de devoluciones?</summary>
                <p>
                  Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que los productos estén en su estado original. Consulta nuestra política de devoluciones para más información.
                </p>
              </details>
            </div>
          </div>
        </section>         
      </main>

      {/* Pie de página */}
      <Footer />
    </>
  );
}