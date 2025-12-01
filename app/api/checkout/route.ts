export const runtime = "nodejs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cart = Array.isArray(body?.cart) ? body.cart : [];
    const secret = process.env.STRIPE_SECRET;
    const currency = process.env.STRIPE_CURRENCY || "MXN";
    if (!secret) {
      // Stripe not configured: return helpful message
      const subtotal = cart.reduce((s: number, it: any) => s + (Number(it.price ?? it.precio) || 0) * (Number(it.qty ?? it.cantidad) || 0), 0);
      const shipping = subtotal > 0 ? 200 : 0;
      const total = subtotal + shipping;
      return NextResponse.json({ ok: true, message: `Pago simulado. Total: $${total}`, url: null });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const stripe = new Stripe(secret, { apiVersion: "2023-11-15" });

    const line_items = cart.map((it: any) => {
      const unitPrice = Math.round((Number(it.price ?? it.precio) || 0) * 100);
      return {
        price_data: {
          currency,
          product_data: {
            name: String(it.name ?? it.nombre ?? "Producto"),
            images: it.image ? [String(it.image)] : undefined,
          },
          unit_amount: unitPrice,
        },
        quantity: Number(it.qty ?? it.cantidad) || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/pago?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/carrito`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e?.message ?? "Error procesando checkout" }, { status: 500 });
  }
}
