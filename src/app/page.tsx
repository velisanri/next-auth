"use client"

import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const { data: session, status } = useSession()
  const [userInfo, setUserInfo] = useState<{ message: string; email: string } | null>(null)

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user")
        .then(res => res.json())
        .then(data => setUserInfo(data))
    }
  }, [status])

  if (status === "loading") return <p>Yükleniyor...</p>
  if (!session) return <p>Lütfen <a href="/login">giriş yap</a>ın.</p>

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Hoşgeldin, {session.user?.name}</h1>
      {userInfo && (
        <>
          <p>{userInfo.message}</p>
          <p>Email: {userInfo.email}</p>
        </>
      )}
      <button onClick={() => signOut()}>Çıkış Yap</button>
    </main>
  )
}
