import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnilloClient from "./AnilloClient";
import { anillosData } from "@/data/anillos";

export async function generateStaticParams() {
  return anillosData.map(a => ({ anillosId: a.id }));
}

// Para ids dinámicos elimina la función y usa: export const dynamic = "force-dynamic";

export default async function AnilloDetallePage({ params }: { params: { anillosId: string } }) {
  const { anillosId } = await params as { anillosId: string };
  const anillo = anillosData.find(a => a.id === anillosId);
  if (!anillo) notFound();
  return (
    <>
      <Header showLoginButton={true} />
      <main className="container section">
        <Link href="/productos/anillos" style={{ display: "inline-block", margin: "0 0 2rem", color: "#555", textDecoration: "none" }}>
          &larr; Volver a todos los anillos
        </Link>
        <AnilloClient anillo={anillo} />
      </main>
      <Footer />
    </>
  );
}