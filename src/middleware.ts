import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Security headers for all responses
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Preview noindex header (in addition to meta)
  const host = context.url.hostname;
  if (host.includes('preview.ursan.org') || host.includes('localhost')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  // Cache headers for static assets (Astro handles via _astro, but we set for HTML)
  const pathname = context.url.pathname;
  if (pathname.startsWith('/_astro/') || pathname.startsWith('/assets/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.endsWith('.xml') || pathname.endsWith('.txt')) {
    response.headers.set('Cache-Control', 'public, max-age=3600');
  }

  return response;
});
