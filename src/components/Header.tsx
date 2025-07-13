"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center shadow-md">
      <nav className="flex space-x-6">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/profile" className="hover:underline">
          Profil
        </Link>
        {session?.user?.role === "admin" && (
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
        )}
      </nav>

      {session ? (
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">Hoşgeldin, {session.user?.name}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
          >
            Çıkış Yap
          </button>
        </div>
      ) : (
        <Link href="/login" className="hover:underline">
          Giriş Yap
        </Link>
      )}
    </header>
  );
}
