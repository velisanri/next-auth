"use client";

import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-center mt-20 text-gray-500">Yükleniyor...</p>;
  if (!session)
    return (
      <p className="text-center mt-20 text-red-600">
        Lütfen{" "}
        <a href="/login" className="text-blue-600 underline hover:text-blue-800">
          giriş yap
        </a>{" "}
       ın.
      </p>
    );

  return (
    <main className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Hoşgeldin, {session.user?.name}!</h1>
      <p className="text-gray-700 mb-2">
        <strong>Email:</strong> {session.user?.email}
      </p>
      <p className="text-gray-700 mb-6">
        <strong>Rolün:</strong> {session.user?.role ?? "user"}
      </p>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300"
      >
        Çıkış Yaps
      </button>
    </main>
  ); 
}
