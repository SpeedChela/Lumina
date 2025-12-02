export const runtime = "nodejs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const session_id = url.searchParams.get("session_id");
    if (!session_id) return NextResponse.json({ ok: false, message: "Missing session_id" }, { status: 400 });

    const secret = process.env.STRIPE_SECRET;
    if (!secret) {
      // Stripe not configured — simulate a paid session
      return NextResponse.json({ ok: true, paid: true });
    }

    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(session_id as string);
    // payment_status can be 'paid' when completed
    const paid = (session.payment_status === "paid") || (session.status === "complete");
    return NextResponse.json({ ok: true, paid });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e?.message ?? "Error verifying session" }, { status: 500 });
  }
}
