import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Space Gradient -->
    <radialGradient id="bgGlow" cx="25%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#180c14"/>
      <stop offset="45%" stop-color="#090a12"/>
      <stop offset="100%" stop-color="#040509"/>
    </radialGradient>

    <!-- Right Side 3D Radial Core Glow -->
    <radialGradient id="tesseractBackGlow" cx="80%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#DC143C" stop-opacity="0.35"/>
      <stop offset="40%" stop-color="#990022" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#040509" stop-opacity="0"/>
    </radialGradient>

    <!-- Text Crimson Gradient -->
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#f4f4f5"/>
      <stop offset="100%" stop-color="#DC143C"/>
    </linearGradient>

    <!-- Tesseract Laser Ray Gradient -->
    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#FF4D6D"/>
      <stop offset="100%" stop-color="#DC143C"/>
    </linearGradient>

    <radialGradient id="innerCoreGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF4D6D" stop-opacity="0.95"/>
      <stop offset="60%" stop-color="#DC143C" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#550010" stop-opacity="0.2"/>
    </radialGradient>

    <filter id="laserGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGlow)"/>
  <rect width="1200" height="630" fill="url(#tesseractBackGlow)"/>

  <!-- Subtle High-Tech Grid & Dots -->
  <g opacity="0.12" stroke="#ffffff" stroke-width="0.5" stroke-dasharray="2 6">
    <line x1="80" y1="0" x2="80" y2="630"/>
    <line x1="1120" y1="0" x2="1120" y2="630"/>
    <line x1="0" y1="80" x2="1200" y2="80"/>
    <line x1="0" y1="550" x2="1200" y2="550"/>
  </g>

  <!-- Starfield Dust -->
  <g fill="#ffffff" opacity="0.6">
    <circle cx="120" cy="140" r="1.5"/>
    <circle cx="340" cy="90" r="1"/>
    <circle cx="560" cy="220" r="2" fill="#7fb5ff" filter="url(#starGlow)"/>
    <circle cx="210" cy="480" r="1.2"/>
    <circle cx="480" cy="520" r="1.8" fill="#ffedd8"/>
    <circle cx="700" cy="110" r="1.2"/>
    <circle cx="1080" cy="180" r="2" fill="#FF4D6D" filter="url(#starGlow)"/>
    <circle cx="1140" cy="430" r="1.5"/>
    <circle cx="680" cy="490" r="1"/>
    <circle cx="920" cy="80" r="1.5"/>
  </g>

  <!-- LEFT COLUMN: EDITORIAL CONTENT -->
  
  <!-- Eyebrow Tag -->
  <g transform="translate(90, 110)">
    <rect width="260" height="32" rx="6" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>
    <circle cx="18" cy="16" r="4" fill="#DC143C"/>
    <text x="32" y="21" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="#e4e4e7" letter-spacing="2.5">
      01 // PORTFOLIO SHOWCASE
    </text>
  </g>

  <!-- Main Name Title -->
  <text x="90" y="215" font-family="'Poppins', sans-serif" font-size="64" font-weight="300" fill="#ffffff" letter-spacing="-1">
    Muhammad
  </text>
  <text x="90" y="285" font-family="'Poppins', sans-serif" font-size="74" font-weight="900" fill="url(#textGrad)" letter-spacing="-1.5">
    Aga Putra
  </text>

  <!-- Role Subtitle -->
  <text x="90" y="340" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" fill="#DC143C" letter-spacing="3.5">
    FRONTEND DEVELOPER &amp; SOFTWARE ENGINEER
  </text>

  <!-- Bio Summary -->
  <text x="90" y="395" font-family="'Poppins', sans-serif" font-size="17" font-weight="300" fill="#a1a1aa" line-height="1.6">
    Interactive 3D WebGL Portfolio · Systems Architecture · Clean Code
  </text>
  <text x="90" y="425" font-family="'Poppins', sans-serif" font-size="16" font-weight="300" fill="#71717a">
    Medan, North Sumatra, Indonesia · Available for Full-Time &amp; Freelance
  </text>

  <!-- Tech Badges Pill Bar -->
  <g transform="translate(90, 475)">
    <!-- Badge 1: React -->
    <rect x="0" y="0" width="88" height="34" rx="8" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.1"/>
    <text x="44" y="22" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500" fill="#ffffff" text-anchor="middle">React.js</text>

    <!-- Badge 2: Laravel -->
    <rect x="98" y="0" width="94" height="34" rx="8" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.1"/>
    <text x="145" y="22" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500" fill="#ffffff" text-anchor="middle">Laravel</text>

    <!-- Badge 3: Three.js 3D -->
    <rect x="202" y="0" width="118" height="34" rx="8" fill="#DC143C" fill-opacity="0.15" stroke="#DC143C" stroke-opacity="0.4"/>
    <text x="261" y="22" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#FF4D6D" text-anchor="middle">Three.js 3D</text>

    <!-- Badge 4: Flutter -->
    <rect x="330" y="0" width="88" height="34" rx="8" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.1"/>
    <text x="374" y="22" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500" fill="#ffffff" text-anchor="middle">Flutter</text>

    <!-- Badge 5: Tailwind -->
    <rect x="428" y="0" width="115" height="34" rx="8" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.1"/>
    <text x="485" y="22" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500" fill="#ffffff" text-anchor="middle">Tailwind CSS</text>
  </g>

  <!-- Bottom URL Pill -->
  <g transform="translate(90, 550)">
    <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="#71717a">
      🌐 porto-aga.vercel.app  ·  github.com/Apisikma123
    </text>
  </g>


  <!-- RIGHT COLUMN: 3D HOLOGRAPHIC TESSERACT HERO ARTIFACT -->
  <g transform="translate(910, 310)">
    
    <!-- Outer Dual Orbital Glow Rings -->
    <ellipse cx="0" cy="0" rx="210" ry="85" fill="none" stroke="#DC143C" stroke-opacity="0.3" stroke-width="1.5" transform="rotate(-25)"/>
    <ellipse cx="0" cy="0" rx="190" ry="70" fill="none" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1" stroke-dasharray="8 4" transform="rotate(35)"/>

    <!-- Ambient Core Glow -->
    <circle cx="0" cy="0" r="120" fill="#DC143C" fill-opacity="0.2" filter="url(#laserGlow)"/>

    <!-- Outer Isometric Cube Faces -->
    <g transform="scale(1.9)">
      <polygon points="0,-60 65,-25 0,10 -65,-25" fill="#ffffff" fill-opacity="0.08"/>
      <polygon points="-65,-25 0,10 0,80 -65,45" fill="#181a24" fill-opacity="0.75"/>
      <polygon points="65,-25 0,10 0,80 65,45" fill="#0d0e14" fill-opacity="0.85"/>

      <!-- Connecting Hyper-Dimensional Laser Rays -->
      <g stroke="url(#laserGrad)" stroke-width="1.8" opacity="0.9" filter="url(#laserGlow)">
        <line x1="0" y1="-60" x2="0" y2="-28"/>
        <line x1="65" y1="-25" x2="32" y2="-12"/>
        <line x1="65" y1="45" x2="32" y2="24"/>
        <line x1="0" y1="80" x2="0" y2="40"/>
        <line x1="-65" y1="45" x2="-32" y2="24"/>
        <line x1="-65" y1="-25" x2="-32" y2="-12"/>
      </g>

      <!-- Outer Isometric Edges -->
      <g fill="none" stroke="#ffffff" stroke-opacity="0.9" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
        <polygon points="0,-60 65,-25 65,45 0,80 -65,45 -65,-25"/>
        <line x1="0" y1="10" x2="0" y2="80"/>
        <line x1="0" y1="10" x2="65" y2="-25"/>
        <line x1="0" y1="10" x2="-65" y2="-25"/>
      </g>

      <!-- Inner Crimson Tesseract Core (Glowing 4D Artifact) -->
      <g filter="url(#laserGlow)">
        <polygon points="0,-28 32,-12 0,4 -32,-12" fill="url(#innerCoreGlow)"/>
        <polygon points="-32,-12 0,4 0,40 -32,24" fill="#8b0018" fill-opacity="0.85"/>
        <polygon points="32,-12 0,4 0,40 32,24" fill="#5c0010" fill-opacity="0.95"/>

        <!-- Inner Core Edges -->
        <polygon points="0,-28 32,-12 32,24 0,40 -32,24 -32,-12" fill="none" stroke="#FF3358" stroke-width="2.2" stroke-linejoin="round"/>
        <line x1="0" y1="4" x2="0" y2="40" stroke="#FF4D6D" stroke-width="2.2"/>
        <line x1="0" y1="4" x2="32" y2="-12" stroke="#FF4D6D" stroke-width="2.2"/>
        <line x1="0" y1="4" x2="-32" y2="-12" stroke="#FF4D6D" stroke-width="2.2"/>

        <!-- Central Radiant Starburst -->
        <circle cx="0" cy="4" r="5" fill="#ffffff" filter="url(#laserGlow)"/>
        <circle cx="0" cy="4" r="2.5" fill="#ffffff"/>
      </g>
    </g>
  </g>

</svg>
`;

async function generate() {
  const publicDir = path.resolve('public');
  const buffer = Buffer.from(svg);

  // Generate 1200x630 PNG OpenGraph Image (for WhatsApp, Telegram, LinkedIn, Twitter, Facebook)
  await sharp(buffer)
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✅ Generated public/og-image.png (1200x630 PNG)');

  await sharp(buffer)
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'og-preview.png'));
  console.log('✅ Generated public/og-preview.png (1200x630 PNG)');

  await sharp(buffer)
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log('✅ Generated public/og-image.jpg (1200x630 JPG)');
}

generate().catch(console.error);
