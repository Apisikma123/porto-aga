import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateFavicons() {
  const svgPath = path.resolve('./public/favicon.svg');
  const publicDir = path.resolve('./public');
  const svgBuffer = fs.readFileSync(svgPath);

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 }, // Google Search Favicon Official Spec
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    const outPath = path.join(publicDir, name);
    await sharp(svgBuffer)
      .resize(size, size)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outPath);
    console.log(`Generated: ${name} (${size}x${size})`);
  }

  // Generate favicon.ico from 32x32 and 48x48
  const ico32Buffer = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico32Buffer);
  console.log('Generated: favicon.ico');

  // Generate site.webmanifest
  const manifest = {
    name: "Muhammad Aga Putra Portfolio",
    short_name: "Aga Putra",
    description: "Official 3D Interactive Portfolio of Muhammad Aga Putra — Frontend Developer & Software Engineer",
    start_url: "/",
    display: "standalone",
    background_color: "#040509",
    theme_color: "#040509",
    icons: [
      {
        src: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  };

  fs.writeFileSync(
    path.join(publicDir, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('Generated: site.webmanifest');
}

generateFavicons().catch(console.error);
