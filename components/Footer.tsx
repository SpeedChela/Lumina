import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer section">
      <div className="footer-flex container">
        {/* Logo en el footer alineado a la izquierda */}
        <div className="footer-logo">
          <Image
            src="/Images/luminalogo.png"
            alt="Logo Lumina"
            width={100}
            height={60}
            style={{ maxWidth: "100px", width: "100%", margin: "1rem 0", borderRadius: "12px" }}
          />
        </div>

        {/* Marca Lumina centrada */}
        <div className="footer-brand">
          <Image
            src="/Images/LogoLetra.png"
            alt="Logo Lumina"
            width={220}
            height={200}
            style={{ maxWidth: "90px", width: "100%", margin: "0 1rem 0 0", borderRadius: "12px" }}
          />
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
  );
}
