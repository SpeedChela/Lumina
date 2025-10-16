import Image from "next/image"; // Importa el componente optimizado de imágenes de Next.js
import Hero from "./components/Hero"; // Importa el componente Hero (puedes quitarlo si no lo usas)

/* 
  Componente principal de la página Home.
  Estructura la página con header, main (contenido principal) y footer.
*/
export default function Home() {
  return (
    <>
      {/* Header principal del sitio */}
      <header className="site-header">
        {/* Barra de navegación principal */}
        <nav className="container nav-flex">
          {/* Logo y nombre de la marca alineados a la izquierda */}
          <div className="nav-logo">
            <Image
              src="/Images/luminalogo.png" // Ruta de la imagen del logo (debe estar en /public/Images)
              alt="Logo Lumina" // Texto alternativo para accesibilidad
              width={50} // Ancho de la imagen
              height={30} // Alto de la imagen
              style={{ maxWidth: "50px", width: "100%", margin: "0 1rem 0 0", borderRadius: "12px" }} // Estilos en línea
            />
            <span className="brand"></span> {/* Nombre de la marca */}
          </div>
          {/* Menú de navegación alineado a la derecha */}
          <ul className="menu">
            <li><a className="btn">Inicio de Sesion</a></li> {/* Botón de inicio de sesión */}
            <li><a className="btn">Registrarse</a></li>     {/* Botón de registro */}
          </ul>
        </nav>
      </header>

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
            <p><a className="btn">Ver coleccion</a></p> {/* Botón de llamada a la acción */}
          </div>
          {/* Imagen del héroe alineada a la derecha */}
          <div className="hero-img">
            <Image
              src="/Images/collares qhpt.png" // Imagen principal de la sección
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
                  src="/Images/anillos.png"
                  alt="Collar elegante de la colección"
                  width={300}
                  height={200}
                  style={{ maxWidth: "300px", width: "100%", margin: "1rem 0", borderRadius: "12px" }}
                />
                <h3 className="h3">Anillos</h3>
                <p>Descubre anillos diseñados para cada momento de tu vida.
                   Desde estilos minimalistas hasta piezas con piedras que roban miradas,
                    encuentra el complemento perfecto para expresar tu personalidad.</p>
                <p><a className="btn">Comprar</a></p>
              </article>
              {/* Tarjeta 2: Pulseras */}
              <article className="container section center card col-4 col-md-6 col-sm-12" role="listitem">
                <Image
                  src="/Images/pulseras.png"
                  alt="Collar elegante de la colección"
                  width={300}
                  height={200}
                  style={{ maxWidth: "300px", width: "100%", margin: "1rem 0", borderRadius: "12px" }}
                />
                <h3 className="h3">Pulseras</h3>
                <p>Detalles que marcan la diferencia. Pulseras versátiles y sofisticadas,
                   ideales para llevar solas o en combinación, creando un estilo auténtico
                    y lleno de carácter.</p>
                <p><a className="btn">Comprar</a></p>
              </article>
              {/* Tarjeta 3: Collares */}
              <article className="container section center card col-4 col-md-6 col-sm-12" role="listitem">
                <Image
                  src="/Images/collares.png"
                  alt="Collar elegante de la colección"
                  width={300}
                  height={200}
                  style={{ maxWidth: "300px", width: "100%", margin: "1rem 0", borderRadius: "12px" }}
                />
                <h3 className="h3">Collares</h3>
                <p>Collares únicos que iluminan tu estilo. Desde cadenas delicadas hasta
                   diseños con brillo impactante, cada pieza está pensada para realzar tu
                    elegancia y acompañarte en cualquier ocasión</p>
                <p><a className="btn">Comprar</a></p>
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
      <footer className="site-footer section">
        <div className="footer-flex container">
          {/* Logo en el footer alineado a la izquierda */}
          <div className="footer-logo">
            <Image
              src="/Images/luminalogo.png"
              alt="Logo Lumina"
              width={50}
              height={30}
              style={{ maxWidth: "100px", width: "100%", margin: "1rem 0", borderRadius: "12px" }}
            />
          </div>
          {/* Marca Lumina centrada */}
          <div className="footer-brand">
            <p>Lumina</p>
          </div>
          {/* Redes sociales alineadas a la derecha */}
          <div className="footer-redes">
            <Image
              src="/Images/redes.png"
              alt="Redes sociales"
              width={50}
              height={30}
              style={{ maxWidth: "100px", width: "100%", margin: "1rem 0", borderRadius: "12px" }}
            />
          </div>
        </div>
      </footer>
    </>
  );
}