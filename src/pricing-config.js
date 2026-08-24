// ═══════════════════════════════════════════════════════════
// CENTRALIZED WEBSITE PRICING CONFIGURATION & LOGIC
// ═══════════════════════════════════════════════════════════

// Base64 obfuscated WhatsApp number to shield against automated web scrapers
const _WA_ENC = "NjI4NTE2OTA4NDEzNg==";
export const PRICING_WA_NUMBER = typeof atob === "function" ? atob(_WA_ENC) : "6285169084136";

export const PRICING_CONFIG = {
  websiteTypes: [
    {
      id: "landing-page",
      icon: "rocket_launch",
      nameId: "Landing Page",
      nameEn: "Landing Page",
      badge: "Best for Promo",
      startingPrice: 499000,
      rangeMin: 499000,
      rangeMax: 1790000,
      descId: "Promosi produk, jasa, campaign iklan, event, atau direct sales 1 halaman.",
      descEn: "Product promo, service campaigns, paid ads, events, or 1-page direct sales.",
      scopeId: "1 halaman single-page, layout modern responsif, tombol CTA WhatsApp, form kontak dasar, fast deployment.",
      scopeEn: "1 single page, modern responsive layout, WhatsApp CTA button, basic contact form, fast deployment.",
      includedId: [
        "1 Halaman (Single-page layout)",
        "Mobile & Desktop Responsive",
        "Tombol CTA WhatsApp Langsung",
        "Formulir Kontak / Inquiry Dasar",
        "Gratis Setup Hosting & Deployment"
      ],
      excludedId: [
        "Animasi 3D kompleks",
        "Copywriting artikel panjang",
        "Payment gateway checkout",
        "Admin dashboard / CMS",
        "Integrasi backend custom"
      ],
      hasPages: true,
      addonCategories: ["general", "marketing"]
    },
    {
      id: "portfolio",
      icon: "palette",
      nameId: "Portfolio Personal / Pro",
      nameEn: "Portfolio Website",
      badge: "For Creatives",
      startingPrice: 599000,
      rangeMin: 599000,
      rangeMax: 1990000,
      descId: "Showcase karya untuk freelancer, developer, fotografer, arsitek, dan personal branding.",
      descEn: "Work showcase for freelancers, developers, designers, photographers, and personal brands.",
      scopeId: "Home, About, Galeri Karya/Proyek, Kontak, integrasi sosial media, layout clean elegan.",
      scopeEn: "Home, About, Project Gallery, Contact, social links, clean elegant layout.",
      includedId: [
        "Multi-section / 1-3 Halaman Showcase",
        "Katalog Proyek & Filter Kategori",
        "Integrasi Akun Sosial & CV Download",
        "Desain Estetik & Mobile Responsive",
        "Gratis Deployment ke Cloud"
      ],
      excludedId: [
        "E-commerce transaksi online",
        "Sistem user login member",
        "Custom API backend kompleks"
      ],
      hasPages: true,
      addonCategories: ["general", "marketing"]
    },
    {
      id: "company-profile",
      icon: "domain",
      nameId: "Company Profile",
      nameEn: "Company Profile",
      badge: "Most Popular",
      startingPrice: 999000,
      rangeMin: 999000,
      rangeMax: 3990000,
      descId: "Membangun kredibilitas resmi untuk UMKM, corporate, jasa profesional, dan instansi.",
      descEn: "Official credibility for SMEs, corporations, professional services, and agencies.",
      scopeId: "Home, Profil Perusahaan, Layanan/Produk, Galeri/Klien, Kontak, Google Maps, WhatsApp lead form.",
      scopeEn: "Home, About Company, Services/Products, Clients/Gallery, Contact, Google Maps, WhatsApp lead form.",
      includedId: [
        "1-5 Halaman Standar Bisnis Lengkap",
        "Profil Perusahaan, Visi & Misi, Legalitas",
        "Katalog Layanan & Keunggulan",
        "Integrasi Google Maps & WhatsApp CTA",
        "Basic On-Page SEO Optimization"
      ],
      excludedId: [
        "Sistem transaksi e-commerce payment",
        "Portal internal karyawan/member",
        "Manajemen database custom lanjutan"
      ],
      hasPages: true,
      addonCategories: ["general", "business", "marketing"]
    },
    {
      id: "blog-news",
      icon: "article",
      nameId: "Blog / Portal Berita",
      nameEn: "Blog & News Portal",
      badge: "Content Publishing",
      startingPrice: 1490000,
      rangeMin: 1490000,
      rangeMax: 3990000,
      descId: "Publikasi artikel, media berita online, majalah digital, dan platform edukasi konten.",
      descEn: "Article publishing, online media news, digital magazine, and content education platform.",
      scopeId: "Homepage dinamis, daftar artikel, halaman detail artikel, kategori, tag, fitur pencarian, author box.",
      scopeEn: "Dynamic homepage, article lists, article detail, categories, tags, search, author box.",
      includedId: [
        "Struktur Konten SEO Friendly & Sitemap",
        "Kategori, Tag, dan Fitur Search Artikel",
        "Author Box, Related Posts, Social Share",
        "CMS / Panel Admin Penulisan Konten",
        "Desain Fast-Loading Reader-Friendly"
      ],
      excludedId: [
        "Sistem langganan berbayar (paywall)",
        "Aplikasi mobile native"
      ],
      hasPages: true,
      addonCategories: ["general", "business", "content"]
    },
    {
      id: "booking",
      icon: "calendar_month",
      nameId: "Booking & Reservasi",
      nameEn: "Booking & Reservation",
      badge: "Automated Booking",
      startingPrice: 2990000,
      rangeMin: 2990000,
      rangeMax: 7990000,
      descId: "Jadwal booking online untuk klinik, salon, barbershop, rental kendaraan, lapangan, atau konsultasi.",
      descEn: "Online schedule booking for clinics, salons, rentals, courts, venues, or consultations.",
      scopeId: "Kalender interaktif, pilihan tanggal/jam/slot, formulir pemesanan, konfirmasi WhatsApp/email, dashboard admin.",
      scopeEn: "Interactive calendar, date/time slots, booking form, email/WA confirmation, admin dashboard.",
      includedId: [
        "Kalender Interaktif & Pemilihan Jam Slot",
        "Formulir Data Pemesan Otomatis",
        "Notifikasi Otomatis ke WhatsApp / Email",
        "Dashboard Admin Kelola Jadwal & Status",
        "Integrasi Google Calendar / Database"
      ],
      excludedId: [
        "Payment gateway auto-split escrow",
        "Sistem multi-cabang kompleks 100+ cabang"
      ],
      hasPages: false,
      addonCategories: ["general", "business", "booking"]
    },
    {
      id: "online-store",
      icon: "storefront",
      nameId: "Toko Online / E-Commerce",
      nameEn: "Online Store / E-Commerce",
      badge: "High Conversion",
      startingPrice: 3490000,
      rangeMin: 3490000,
      rangeMax: 9990000,
      descId: "Katalog produk, keranjang belanja, checkout WhatsApp / payment gateway otomatis untuk penjualan 24/7.",
      descEn: "Product catalog, shopping cart, WhatsApp / automatic payment gateway checkout for 24/7 sales.",
      scopeId: "Katalog produk, varian, keranjang, kalkulasi ongkir, checkout otomatis, panel admin inventori & pesanan.",
      scopeEn: "Product catalog, variants, cart, shipping calculation, checkout, inventory & order admin panel.",
      includedId: [
        "Katalog Produk, Kategori & Varian",
        "Sistem Keranjang Belanja (Shopping Cart)",
        "Checkout WhatsApp & Notifikasi Invoice",
        "Panel Admin Kelola Produk, Stok & Pesanan",
        "Bebas Potongan Komisi Marketplace"
      ],
      excludedId: [
        "Multi-vendor marketplace seperti Shopee/Tokopedia",
        "Sistem pergudangan multi-hub logistik otomatis"
      ],
      hasPages: true,
      addonCategories: ["general", "business", "ecommerce"]
    },
    {
      id: "attendance",
      icon: "fingerprint",
      nameId: "Sistem Absensi & HR",
      nameEn: "Attendance & HR System",
      badge: "Management Tool",
      startingPrice: 3990000,
      rangeMin: 3990000,
      rangeMax: 10990000,
      descId: "Presensi kehadiran online berbasis GPS/lokasi & foto selfie, rekap cuti, shift, dan ekspor laporan.",
      descEn: "Online attendance with GPS/location & selfie, leave management, shifts, and exportable reports.",
      scopeId: "Portal karyawan, check-in/out GPS, panel admin rekapitulasi, export Excel/PDF, manajemen jam kerja.",
      scopeEn: "Employee portal, GPS check-in/out, admin recap panel, Excel/PDF export, working hours management.",
      includedId: [
        "Check-In / Out Berbasis GPS & Foto Selfie",
        "Dashboard Rekapitulasi Kehadiran & Terlambat",
        "Manajemen Cuti, Izin, dan Sakit",
        "Ekspor Laporan Bulanan ke Excel / PDF",
        "Manajemen Data Karyawan & Hak Akses"
      ],
      excludedId: [
        "Hardware mesin sidik jari fisik",
        "Integrasi payroll bank auto-debit massal"
      ],
      hasPages: false,
      addonCategories: ["general", "attendance"]
    },
    {
      id: "information-system",
      icon: "database",
      nameId: "Sistem Informasi Manajemen",
      nameEn: "Information System",
      badge: "Enterprise Data",
      startingPrice: 5490000,
      rangeMin: 5490000,
      rangeMax: 15990000,
      descId: "Aplikasi pengolahan data internal bisnis, inventori pergudangan, POS kasir, atau operasional kantor.",
      descEn: "Internal business data processing, warehouse inventory, POS cashier, or office operational tools.",
      scopeId: "Database relasional terintegrasi, autentikasi multi-role pengguna, CRUD master data, filter & grafik statistik.",
      scopeEn: "Relational database, multi-role auth, master data CRUD, filtering & statistics charts.",
      includedId: [
        "Autentikasi Aman Multi-Level (Admin/Staff/Manager)",
        "Modul Pengelolaan Data Bisnis Terpadu (CRUD)",
        "Dashboard Statistik & Grafik Analisis",
        "Pencarian Cepat, Filter Kompleks & Ekspor Data",
        "Arsitektur Database Terenkripsi & Backup"
      ],
      excludedId: [
        "Infrastruktur high-availability multi-datacenter"
      ],
      hasPages: false,
      addonCategories: ["general", "business"]
    },
    {
      id: "custom-web-app",
      icon: "code_blocks",
      nameId: "Custom Web App Fullstack",
      nameEn: "Custom Web App",
      badge: "Tailored Architecture",
      startingPrice: 7490000,
      rangeMin: 7490000,
      rangeMax: 29990000,
      isCustom: true,
      descId: "Sistem web khusus sesuai logika bisnis unik, SaaS, platform marketplace, atau integrasi API kompleks.",
      descEn: "Custom web tailored to unique business logic, SaaS platforms, marketplace, or complex API integrations.",
      scopeId: "Arsitektur frontend + backend scalable, REST/GraphQL API, database khusus, cloud hosting terisolasi.",
      scopeEn: "Scalable frontend + backend architecture, REST/GraphQL API, custom database, isolated cloud hosting.",
      includedId: [
        "Arsitektur Kustom Tailor-Made Sesuai Kebutuhan",
        "Frontend Interaktif (React/Vue/Modern JS) + Backend API",
        "Database Architecture Berkinerja Tinggi",
        "Integrasi Pihak Ketiga (Payment, SMS, WA Gateway, Maps)",
        "Dokumentasi Teknis Lengkap & Garansi Bug"
      ],
      excludedId: [
        "Scope tambahan di luar kesepakatan spesifikasi awal"
      ],
      hasPages: false,
      addonCategories: ["general", "business"]
    }
  ],

  pageOptions: {
    "landing-page": [
      { id: "1-page", labelId: "1 Halaman Standar (Maks. 5 Bagian)", labelEn: "1 Standard Page (Up to 5 sections)", price: 0 },
      { id: "long-page", labelId: "Long Landing Page (6–10 Bagian Detail)", labelEn: "Long Landing Page (6–10 sections)", price: 200000 }
    ],
    "portfolio": [
      { id: "p-basic", labelId: "1–3 Halaman (Showcase Ringkas)", labelEn: "1–3 Pages (Compact Showcase)", price: 0 },
      { id: "p-medium", labelId: "4–6 Halaman (Showcase Lengkap + Detail)", labelEn: "4–6 Pages (Full Showcase + Details)", price: 300000 },
      { id: "p-large", labelId: "7+ Halaman (Showcase Dinamis)", labelEn: "7+ Pages (Dynamic Showcase)", price: 600000 }
    ],
    "company-profile": [
      { id: "cp-standard", labelId: "1–5 Halaman (Home, About, Services, Gallery, Contact)", labelEn: "1–5 Pages (Standard Structure)", price: 0 },
      { id: "cp-medium", labelId: "6–8 Halaman (Termasuk Cabang / Tim / Karir)", labelEn: "6–8 Pages (Extended Structure)", price: 450000 },
      { id: "cp-enterprise", labelId: "9–12 Halaman (Multi-Divisi & Katalog Lengkap)", labelEn: "9–12 Pages (Multi-Division)", price: 900000 }
    ],
    "blog-news": [
      { id: "blog-standard", labelId: "Struktur Standar (Home, Kategori, Detail, Kontak)", labelEn: "Standard Structure", price: 0 },
      { id: "blog-extended", labelId: "Struktur Lengkap (Multi-Author, Arsip, Landing Liputan)", labelEn: "Extended Structure", price: 500000 }
    ],
    "online-store": [
      { id: "store-starter", labelId: "Katalog Starter (s.d. 15 Produk)", labelEn: "Starter Catalog (up to 15 products)", price: 0 },
      { id: "store-growth", labelId: "Katalog Growth (16–50 Produk + Varian)", labelEn: "Growth Catalog (16–50 products)", price: 600000 },
      { id: "store-pro", labelId: "Katalog Pro (50+ Produk + Manajemen Kategori Besar)", labelEn: "Pro Catalog (50+ products)", price: 1200000 }
    ]
  },

  designLevels: [
    {
      id: "clean",
      nameId: "Clean / Standard",
      nameEn: "Clean / Standard",
      price: 0,
      icon: "devices",
      descId: "Desain profesional rapi, navigasi intuitif, tipografi harmonis, 100% responsif mobile & tablet.",
      descEn: "Professional tidy layout, intuitive navigation, modern typography, 100% responsive."
    },
    {
      id: "custom",
      nameId: "Custom Modern",
      nameEn: "Custom Modern",
      price: 450000,
      icon: "auto_awesome",
      descId: "Desain visual eksklusif, micro-interactions halus, mode dark/light berkelas, aksen grafis estetik.",
      descEn: "Exclusive visual branding, smooth micro-interactions, sleek dark/light modes, custom graphics."
    },
    {
      id: "premium",
      nameId: "Premium 3D / Interactive",
      nameEn: "Premium 3D / Interactive",
      price: 1250000,
      icon: "view_in_ar",
      descId: "Visual animasi Three.js 3D interaktif, transisi scroll GSAP sinematik, efek glassmorphism mewah.",
      descEn: "Three.js 3D interactive graphics, cinematic GSAP scroll choreography, luxury visual identity."
    }
  ],

  addons: {
    general: [
      { id: "seo-basic", nameId: "Basic On-Page SEO & Meta Tags", nameEn: "Basic On-Page SEO & Meta Tags", price: 250000, descId: "Struktur heading, meta title/description, sitemap XML, dan optimasi tag gambar." },
      { id: "seo-advanced", nameId: "Advanced Technical SEO & Schema.org", nameEn: "Advanced Technical SEO & Schema.org", price: 650000, descId: "JSON-LD structured data rich snippet, canonical tags, Open Graph, Core Web Vitals Grade A." },
      { id: "wa-floating", nameId: "Tombol Floating WhatsApp Smart Click", nameEn: "Floating WhatsApp Button", price: 150000, descId: "Widget WhatsApp mengambang dengan template pesan pembuka otomatis." },
      { id: "multilingual", nameId: "Multi-Bahasa / Bilingual (ID & EN)", nameEn: "Multi-Language (ID & EN)", price: 450000, descId: "Tombol switcher bahasa dengan penerjemahan antarmuka dua bahasa." },
      { id: "google-maps", nameId: "Google Maps & Business Location", nameEn: "Google Maps & Business Integration", price: 150000, descId: "Integrasi peta interaktif lokasi bisnis dengan tombol navigasi instan." },
      { id: "speed-opt", nameId: "Ultra Speed & Asset Compression", nameEn: "Ultra Speed & Asset Compression", price: 350000, descId: "Kompresi gambar WebP modern, caching server, dan minifikasi kode super cepat." },
      { id: "analytics", nameId: "Google Analytics 4 & Meta Pixel", nameEn: "Google Analytics 4 & Meta Pixel", price: 250000, descId: "Pemasangan tracking pengunjung, event klik, dan conversion pixel iklan." },
      { id: "copywriting", nameId: "Copywriting Konten & Headline Penjualan", nameEn: "Sales Copywriting & Headlines", price: 400000, descId: "Penulisan teks website profesional yang persuasif dan berorientasi konversi." }
    ],
    business: [
      { id: "cms-admin", nameId: "Admin CMS (Kelola Teks & Gambar Sendiri)", nameEn: "Admin CMS Panel", price: 750000, descId: "Dashboard admin mudah untuk menambah, mengedit teks, foto, dan konten kapan saja." },
      { id: "email-business", nameId: "Setup Email Bisnis (nama@domain.com)", nameEn: "Business Email Setup", price: 250000, descId: "Konfigurasi email profesional resmi menggunakan nama domain sendiri." },
      { id: "livechat", nameId: "Live Chat Widget / Customer Support", nameEn: "Live Chat Widget Integration", price: 200000, descId: "Integrasi widget live chat real-time (Tidio / Crisp / JivoChat)." }
    ],
    ecommerce: [
      { id: "payment-gateway", nameId: "Payment Gateway Otomatis (QRIS / VA / CC)", nameEn: "Payment Gateway (QRIS/VA/Cards)", price: 850000, descId: "Integrasi Midtrans / Xendit / Tripay untuk verifikasi pembayaran real-time 24 jam." },
      { id: "ongkir-auto", nameId: "Kalkulator Ongkir Otomatis (JNE, J&T, SiCepat)", nameEn: "Automatic Shipping Calculator", price: 650000, descId: "Pengecekan tarif ongkos kirim otomatis berdasarkan kecamatan pembeli." }
    ],
    booking: [
      { id: "wa-booking-alert", nameId: "Notifikasi WhatsApp Admin & Pelanggan", nameEn: "Automated WhatsApp Alerts", price: 450000, descId: "Kirim pesan konfirmasi booking dan pengingat jadwal langsung ke nomor WA pelanggan." },
      { id: "multi-staff", nameId: "Pilihan Terapis / Staff / Ruangan", nameEn: "Staff / Room Selection Filter", price: 500000, descId: "Fitur memilih staf tertentu dan pengecekan jadwal ketersediaan masing-masing staf." }
    ],
    attendance: [
      { id: "export-excel", nameId: "Ekspor Laporan Otomatis Excel & PDF", nameEn: "Automatic Excel & PDF Reports", price: 350000, descId: "Download rekapitulasi absensi harian/bulanan dalam format spreadsheet & PDF rapi." },
      { id: "shift-roster", nameId: "Manajemen Multi Shift Jam Kerja", nameEn: "Multi-Shift Working Hours", price: 600000, descId: "Pengaturan rotasi shift pagi, siang, malam, dan toleransi keterlambatan." }
    ]
  },

  businessTypes: [
    { id: "umkm", labelId: "UMKM / Toko Lokal", labelEn: "SME / Local Business" },
    { id: "jasa", labelId: "Jasa Profesional / Konsultan", labelEn: "Professional Services" },
    { id: "corporate", labelId: "Perusahaan / Corporate", labelEn: "Corporate / Enterprise" },
    { id: "kreatif", labelId: "Kreatif / Personal Brand", labelEn: "Creative / Personal Brand" },
    { id: "startup", labelId: "Startup / Tech Product", labelEn: "Startup / Tech" },
    { id: "fnb", labelId: "F&B / Kuliner / Resto", labelEn: "F&B / Restaurant" },
    { id: "klinik", labelId: "Klinik / Kesehatan / Salon", labelEn: "Health / Beauty Clinic" }
  ],

  projectGoals: [
    { id: "brand-trust", labelId: "Meningkatkan Kredibilitas & Trust", labelEn: "Build Credibility & Trust" },
    { id: "lead-gen", labelId: "Mendapatkan Banyak Chat / Leads WhatsApp", labelEn: "Get WhatsApp Leads" },
    { id: "direct-sales", labelId: "Penjualan Produk Otomatis 24 Jam", labelEn: "Automate Direct Sales" },
    { id: "automation", labelId: "Efisiensi Operasional / Booking Otomatis", labelEn: "Operational Efficiency" },
    { id: "redesign", labelId: "Modernisasi Desain Website Lama", labelEn: "Modernize Old Website" }
  ]
};

// ═══════════════════════════════════════════════════════════
// CALCULATION LOGIC
// ═══════════════════════════════════════════════════════════

export function formatPriceRp(amount) {
  if (amount >= 1000000) {
    const jt = amount / 1000000;
    const formatted = jt % 1 === 0 ? jt.toFixed(0) : jt.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    return `Rp${formatted}JT`;
  }
  return `Rp${amount.toLocaleString("id-ID")}`;
}

export function formatPriceRpFull(amount) {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

export function calculatePricingEstimate(state, lang = "id") {
  const wt = PRICING_CONFIG.websiteTypes.find((w) => w.id === state.websiteType);
  if (!wt) {
    return {
      min: 0,
      max: 0,
      displayPrice: "Rp0",
      isRange: false,
      isCustom: false,
      breakdown: []
    };
  }

  let total = wt.startingPrice;
  const breakdown = [
    {
      category: lang === "en" ? "Starting Package" : "Paket Dasar",
      name: lang === "en" ? wt.nameEn : wt.nameId,
      price: wt.startingPrice,
      isStarting: true
    }
  ];

  // Page / Scope adjustment
  if (wt.hasPages && PRICING_CONFIG.pageOptions[wt.id]) {
    const poList = PRICING_CONFIG.pageOptions[wt.id];
    const po = poList[state.pageOption || 0] || poList[0];
    if (po && po.price > 0) {
      total += po.price;
      breakdown.push({
        category: lang === "en" ? "Page Scope" : "Jumlah Halaman",
        name: lang === "en" ? po.labelEn : po.labelId,
        price: po.price
      });
    }
  }

  // Design level
  const dl = PRICING_CONFIG.designLevels.find((d) => d.id === state.designLevel) || PRICING_CONFIG.designLevels[0];
  if (dl && dl.price > 0) {
    total += dl.price;
    breakdown.push({
      category: lang === "en" ? "Design Level" : "Tingkat Desain",
      name: lang === "en" ? dl.nameEn : dl.nameId,
      price: dl.price
    });
  }

  // Add-ons
  let addonsTotal = 0;
  const selectedAddonsList = [];
  if (state.selectedAddons && state.selectedAddons.size > 0) {
    state.selectedAddons.forEach((aid) => {
      for (const cat of Object.values(PRICING_CONFIG.addons)) {
        const item = cat.find((a) => a.id === aid);
        if (item) {
          addonsTotal += item.price;
          selectedAddonsList.push(lang === "en" ? item.nameEn : item.nameId);
          breakdown.push({
            category: lang === "en" ? "Add-on Feature" : "Fitur Tambahan",
            name: lang === "en" ? item.nameEn : item.nameId,
            price: item.price
          });
          break;
        }
      }
    });
    total += addonsTotal;
  }

  // Determine realistic estimate range
  let min = total;
  let max = total;

  if (wt.isCustom) {
    max = Math.max(wt.rangeMax, total * 2);
    min = total;
  } else if (wt.rangeMax > min && min > wt.startingPrice) {
    max = Math.min(wt.rangeMax, Math.round(total * 1.35));
  } else {
    max = wt.rangeMax;
  }

  const isRange = min !== max && (wt.isCustom || (max - min) >= 400000);
  const displayPrice = isRange
    ? `${formatPriceRp(min)} – ${formatPriceRp(max)}`
    : formatPriceRpFull(total);

  return {
    min,
    max,
    total,
    isRange,
    isCustom: !!wt.isCustom,
    displayPrice,
    breakdown
  };
}

export function buildWhatsAppMessage(state, lang = "id") {
  const wt = PRICING_CONFIG.websiteTypes.find((w) => w.id === state.websiteType) || PRICING_CONFIG.websiteTypes[0];
  const estimate = calculatePricingEstimate(state, lang);

  let m = "";
  if (state.clientName) {
    m += `Halo Aga, saya *${state.clientName.trim()}*. Saya ingin konsultasi pembuatan website.\n\n`;
  } else {
    m += `Halo Aga, saya ingin konsultasi pembuatan website.\n\n`;
  }

  m += `📋 *RINGKASAN KONFIGURASI WEBSITE*\n`;
  m += `────────────────────────────\n`;
  m += `• *Jenis Website:* ${lang === "en" ? wt.nameEn : wt.nameId}\n`;

  if (wt.hasPages && PRICING_CONFIG.pageOptions[wt.id]) {
    const poList = PRICING_CONFIG.pageOptions[wt.id];
    const po = poList[state.pageOption || 0] || poList[0];
    if (po) m += `• *Jumlah Halaman:* ${lang === "en" ? po.labelEn : po.labelId}\n`;
  }

  const dl = PRICING_CONFIG.designLevels.find((d) => d.id === state.designLevel) || PRICING_CONFIG.designLevels[0];
  if (dl) m += `• *Level Desain:* ${lang === "en" ? dl.nameEn : dl.nameId}\n`;

  if (state.selectedAddons && state.selectedAddons.size > 0) {
    const addonNames = [];
    state.selectedAddons.forEach((aid) => {
      for (const cat of Object.values(PRICING_CONFIG.addons)) {
        const item = cat.find((a) => a.id === aid);
        if (item) {
          addonNames.push(lang === "en" ? item.nameEn : item.nameId);
          break;
        }
      }
    });
    if (addonNames.length > 0) {
      m += `• *Fitur Add-on:* ${addonNames.join(", ")}\n`;
    }
  }

  if (state.businessType) {
    const b = PRICING_CONFIG.businessTypes.find((x) => x.id === state.businessType);
    if (b) m += `• *Jenis Bisnis:* ${lang === "en" ? b.labelEn : b.labelId}\n`;
  }

  if (state.projectGoal) {
    const g = PRICING_CONFIG.projectGoals.find((x) => x.id === state.projectGoal);
    if (g) m += `• *Tujuan Website:* ${lang === "en" ? g.labelEn : g.labelId}\n`;
  }

  m += `\n💰 *Estimasi Awal:* ${estimate.displayPrice}\n`;
  m += `_(Catatan: Estimasi transparan, scope final dikonfirmasi setelah konsultasi)_\n`;

  if (state.clientNotes) {
    m += `\n📝 *Catatan Khusus:*\n"${state.clientNotes.trim()}"\n`;
  }

  m += `\nSaya ingin mengetahui langkah selanjutnya dan jadwal pengerjaannya. Terima kasih!`;
  return m;
}
