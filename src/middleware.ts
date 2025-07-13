import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const protectedPaths = ['/admin', '/profile', '/dashboard']
  const adminPaths = ['/admin']

  const pathname = req.nextUrl.pathname

  // Korunan sayfalara istek geldiyse token kontrolü yap
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // Oturum yoksa login'e yönlendir
    if (!token) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', req.url)
      return NextResponse.redirect(loginUrl)
    }

    // Admin yolları için rol kontrolü
    if (adminPaths.some(path => pathname.startsWith(path))) {
      if (token.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }
  }

  // Diğer tüm istekleri devam ettir
  return NextResponse.next()
}

/** Hangi yollar için middleware çalışacak? */
export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/dashboard/:path*'],
}
