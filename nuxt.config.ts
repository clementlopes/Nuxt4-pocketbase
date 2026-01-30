// Import TailwindCSS plugin for Nuxt
import tailwindcss from '@tailwindcss/vite';

// Define the main Nuxt configuration object
// This is where you configure your Nuxt application's behavior
export default defineNuxtConfig({
  // Compatibility date for Nuxt features - ensures consistent behavior across versions
  compatibilityDate: '2025-07-15',

  // Enable Nuxt DevTools for enhanced development experience
  devtools: { enabled: true },

  // Global CSS files that will be imported in the application
  css: ['./app/assets/css/main.css'],

  // Vite configuration - Vite is the build tool used by Nuxt 4
  vite: {
    // Add TailwindCSS plugin to Vite for processing CSS
    plugins: [tailwindcss()],
  },

  // Nuxt modules to extend functionality - Pinia for state management
  modules: ['@pinia/nuxt'],

  // Runtime configuration - values available during runtime
  // These can be overridden by environment variables
  runtimeConfig: {
    // PocketBase API URL - can be overridden by environment variables
    pocketbaseUrl: process.env.POCKETBASE_URL || 'https://api.clementlopes.site',
  },

  // Application-level configuration
  app: {
    // HTML head configuration - defines meta tags, links, etc.
    head: {
      link: [
        // Different favicon sizes for various devices
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
      ],
    },
  },
});
