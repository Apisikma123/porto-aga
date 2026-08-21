import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function convertDir(dirPath, quality = 82) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const inputPath = path.join(dirPath, file);
      const outputFilename = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      const outputPath = path.join(dirPath, outputFilename);
      
      const beforeStat = fs.statSync(inputPath);
      await sharp(inputPath)
        .webp({ quality, effort: 6 })
        .toFile(outputPath);
      const afterStat = fs.statSync(outputPath);
      
      const savings = (((beforeStat.size - afterStat.size) / beforeStat.size) * 100).toFixed(1);
      console.log(`Converted: ${file} (${(beforeStat.size / 1024).toFixed(1)} KB) -> ${outputFilename} (${(afterStat.size / 1024).toFixed(1)} KB) | Saved ${savings}%`);
    }
  }
}

async function main() {
  console.log('--- Converting Projects Images ---');
  await convertDir(path.resolve('./public/projects'), 85);
  
  console.log('--- Converting Texture Images ---');
  await convertDir(path.resolve('./public/textures'), 82);
  
  console.log('--- WebP Conversion Complete! ---');
}

main().catch(console.error);
