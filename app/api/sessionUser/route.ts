export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

const COOKIE = process.env.SESSION_COOKIE_NAME ?? "__session";

export async function GET() {
  try {
    const token = (await cookies()).get(COOKIE)?.value;
    if (!token) return NextResponse.json({ user: null });

    const decoded = await adminAuth.verifySessionCookie(token, true);
    const user = {
      uid: decoded.uid,
      email: (decoded as any).email,
      displayName: (decoded as any).displayName || (decoded as any).name,
      picture: (decoded as any).picture,
    };
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ user: null });
  }
}
