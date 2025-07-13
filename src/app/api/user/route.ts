import { getServerSession } from "next-auth/next";
import authOptions from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // accessToken'ı tip dönüşümü ile alıyoruz (ESLint any hatası olmaz)
  const accessToken = (session as { accessToken?: string }).accessToken;
  const userRole = session.user?.role;

  return NextResponse.json({
    user: session.user,
    accessToken,
    role: userRole,
  });
}
