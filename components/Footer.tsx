import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contacto" className="site-footer section">
      <div className="footer-flex container">

        {/* Logo izquierda */}
        <div className="footer-logo">
          <Image
            src="/Images/luminalogo.png"
            alt="Logo Lumina"
            width={100}
            height={60}
            style={{
              maxWidth: "100px",
              width: "100%",
              margin: "1rem 0",
              borderRadius: "12px",
            }}
          />
        </div>

        {/* Información de contacto en el centro */}
        <div className="footer-info">
          <h3 className="footer-title">Contáctanos</h3>
          <p className="footer-text">📞 +52 722 123 4567</p>
          <p className="footer-text">📧 contacto@lumina.com</p>
        </div>

        {/* Redes sociales con nombres */}
        <div className="footer-redes">
          <h3 className="footer-title">Síguenos</h3>

          <div className="redes-list">
            <div className="red-item">
              <Image src="/Images/instagram.png" alt="Instagram" width={24} height={24} />
              <span>Instagram</span>
            </div>

            <div className="red-item">
              <Image src="/Images/facebook.png" alt="Facebook" width={30} height={30} />
              <span>Facebook</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
