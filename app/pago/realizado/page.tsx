import React, { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RealizadoClient from "./RealizadoClient";

export default function PagoRealizadoPage() {
  return (
    <>
      <Header showLoginButton={false} />
      <main className="min-h-screen bg-gradient-to-b from-[#fdfaf4] to-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Suspense fallback={<div className="bg-white/80 border border-[#e7ddc9] rounded-2xl p-8 shadow-sm text-center">Verificando...</div>}>
            <RealizadoClient />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
