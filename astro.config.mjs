// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://alpasio-rentals-preview.ursan.org',
  output: 'static',
  security: {
    checkOrigin: false,
  },
  adapter: node({
    mode: 'standalone',
  }),
  trailingSlash: 'always',
  image: {
    domains: ['alpasio.ro'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ro',
        locales: {
          ro: 'ro-RO',
          en: 'en-GB',
        },
      },
      filter: (page) => !page.includes('/multumim/') && !page.includes('/thank-you/'),
    }),
  ],
  redirects: {
    '/apartamentele-noastre': '/ro/apartamente/',
    '/apartament-m19': '/ro/apartamente/m19/',
    '/apartament-m2': '/ro/apartamente/m2/',
    '/contact': '/ro/contact/',
    '/intrebari-frecvente': '/ro/intrebari-frecvente/',
    '/blog': '/ro/blog/',
    '/politica-de-cookies': '/ro/politica-cookies/',
  },
});
