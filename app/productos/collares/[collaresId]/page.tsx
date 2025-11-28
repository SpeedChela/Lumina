import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import CollarClient from "./CollarClient";
import { collaresData } from "@/data/collares";

export async function generateStaticParams() {
  return collaresData.map(c => ({ collaresId: c.id }));
}

// Si quieres permitir ids fuera del array quita generateStaticParams y añade:
// export const dynamic = "force-dynamic";

export default function CollarDetallePage({ params }: { params: { collaresId: string } }) {
  const collar = collaresData.find(c => c.id === params.collaresId);
  if (!collar) notFound();
  return (
    <>
      <Header showLoginButton={true} />
      <main className="container section">
        <Link href="/productos/collares" style={{ display: "inline-block", margin: "0 0 2rem", color: "#555", textDecoration: "none" }}>
          &larr; Volver a todos los collares
        </Link>
        <CollarClient collar={collar} />
      </main>
      <Footer />
    </>
  );
}