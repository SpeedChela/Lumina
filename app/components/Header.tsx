import Link from "next/link"
import Image from "next/image"

type Props = {
    showLoginButton?: boolean;
};

export default function Header({ showLoginButton = true }: Props) {
  return (
    <header className="site-header">
      <nav className="container nav">
        <div className="nav-logo">
          <Image
            src="/Images/LogoLetra.png" // archivo en public/Images/
            alt="Logo Lumina"
            width={220}
            height={200}
            style={{ maxWidth: "90px", width: "100%", margin: "0 1rem 0 0", borderRadius: "12px" }}
          />
        </div>
        <ul className="menu">
          {showLoginButton && (
            <>
              <li><Link href="/login" className="btnTransparente">Inicio de Sesión</Link></li>
              <li><Link href="/register" className="btnYellow">Registrarse</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}