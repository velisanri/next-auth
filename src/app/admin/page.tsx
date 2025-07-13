"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Yetkisiz kullanıcıları yönlendir
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (session && session.user?.role !== "admin") {
      router.replace("/unauthorized");
    }
  }, [session, status, router]);

  if (status === "loading")
    return <p className="text-center mt-20 text-gray-500">Yükleniyor…</p>;

  if (!session || session.user?.role !== "admin") return null;

  // 🔐 Tam çıkış (NextAuth + Auth0)
  const fullSignOut = async () => {
    await signOut({ redirect: false }); // önce NextAuth oturumunu sil
    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
    const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
    const returnTo = encodeURIComponent("http://localhost:3000/login");
    window.location.href = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`;
  };

  return (
    <main className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Admin Paneli</h1>

      <p className="mb-4 text-gray-700">
        Sadece <strong>admin</strong> rolündeki kullanıcıların görebileceği
        özel içerik buraya gelecek.
      </p>

      <button
        onClick={fullSignOut}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300"
      >
        Çıkış Yap
      </button>
    </main>
  );
}
