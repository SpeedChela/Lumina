import React, { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PagoClient from "./PagoClient";

export default function PagoPage() {
  return (
    <>
      <Header showLoginButton={false} />
      <main className="min-h-screen bg-gradient-to-b from-[#fdfaf4] to-white">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <Suspense fallback={<div className="bg-white/80 border border-[#e7ddc9] rounded-2xl p-8 shadow-sm text-center">Cargando...</div>}>
            <PagoClient />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}