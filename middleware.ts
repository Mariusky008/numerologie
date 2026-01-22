import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Protection de la route /admin ET des routes API sensibles
  // On exclut /api/book-request POST (création de commande publique)
  const isProtectedApi = 
    (pathname.startsWith('/api/book-request') && req.method !== 'POST') ||
    pathname.startsWith('/api/generate-video') ||
    pathname.startsWith('/api/generate-script') ||
    pathname.startsWith('/api/send-video') ||
    pathname.startsWith('/api/stats');

  if (pathname.startsWith('/admin') || isProtectedApi) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // Récupération des identifiants depuis les variables d'environnement
      // Fallback sur des valeurs par défaut si non définies (DEV uniquement)
      const validUser = process.env.ADMIN_USER || 'admin';
      const validPass = process.env.ADMIN_PASSWORD || 'numerologie2024';

      if (user === validUser && pwd === validPass) {
        return NextResponse.next();
      }
    }

    // Si pas auth ou mauvais identifiants, on demande le login
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/book-request',
    '/api/generate-video',
    '/api/generate-script',
    '/api/send-video',
    '/api/stats'
  ],
};