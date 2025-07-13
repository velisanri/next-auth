"use client";

import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return <p className="text-center mt-20 text-gray-500">Yükleniyor...</p>;

  if (!session)
    return (
      <p className="text-center mt-20 text-red-600">
        Lütfen{" "}
        <a
          href="/login"
          className="text-blue-600 underline hover:text-blue-800"
        >
          giriş yap
        </a>{" "}
        ın.
      </p>
    );

  return (
    <main className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-xl shadow-lg mt-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Profilim</h1>

      <p className="mb-3 text-lg">
        <strong>Ad Soyad:</strong> {session.user?.name}
      </p>
      <p className="mb-3 text-lg">
        <strong>Email:</strong> {session.user?.email}
      </p>
      <p className="mb-6 text-lg">
        <strong>Rol:</strong> {session.user?.role ?? "user"}
      </p>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300"
      >
        Çıkış Yap
      </button>
    </main>
  );
}
