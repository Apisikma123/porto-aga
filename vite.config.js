import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    cors: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    cors: true,
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
        project: resolve(import.meta.dirname, 'project.html'),
        pricing: resolve(import.meta.dirname, 'pricing.html'),
        jasaWebsite: resolve(import.meta.dirname, 'jasa-pembuatan-website.html'),
        jasaLandingPage: resolve(import.meta.dirname, 'jasa-pembuatan-landing-page.html'),
        jasaCompanyProfile: resolve(import.meta.dirname, 'jasa-pembuatan-company-profile.html'),
        jasaPortfolio: resolve(import.meta.dirname, 'jasa-pembuatan-portfolio.html'),
        jasaTokoOnline: resolve(import.meta.dirname, 'jasa-pembuatan-toko-online.html'),
        jasaBooking: resolve(import.meta.dirname, 'jasa-pembuatan-website-booking.html'),
        jasaAbsensi: resolve(import.meta.dirname, 'jasa-pembuatan-website-absensi.html'),
        jasaWebApp: resolve(import.meta.dirname, 'jasa-pembuatan-web-app.html'),
        jasaWebAppCustom: resolve(import.meta.dirname, 'jasa-pembuatan-web-app-custom.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
        },
      },
    },
  },
});
