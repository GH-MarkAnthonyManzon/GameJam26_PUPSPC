const { Jimp } = require('jimp');

async function findCrops(filePath, numExpected) {
  const img = await Jimp.read(filePath);
  const w = img.bitmap.width;
  const h = img.bitmap.height;

  let opaquePixels = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (w * y + x) << 2;
      const alpha = img.bitmap.data[idx + 3];
      if (alpha > 10) { // arbitrary alpha threshold
        opaquePixels.push({ x, y });
      }
    }
  }

  // We can group them by X coordinate roughly using KMeans or simply by gaps.
  // Sort by X
  opaquePixels.sort((a, b) => a.x - b.x);

  let clusters = [];
  let currentCluster = null;
  let lastX = -100;

  for (const p of opaquePixels) {
    if (p.x - lastX > 30) { // Gap of 30 pixels means a new object
      if (currentCluster) clusters.push(currentCluster);
      currentCluster = { minX: p.x, maxX: p.x, minY: p.y, maxY: p.y };
    } else {
      currentCluster.minX = Math.min(currentCluster.minX, p.x);
      currentCluster.maxX = Math.max(currentCluster.maxX, p.x);
      currentCluster.minY = Math.min(currentCluster.minY, p.y);
      currentCluster.maxY = Math.max(currentCluster.maxY, p.y);
    }
    lastX = p.x;
  }
  if (currentCluster) clusters.push(currentCluster);

  console.log('File:', filePath);
  clusters.forEach((c, i) => {
    console.log(`Cluster ${i}: x=${c.minX}, y=${c.minY}, w=${c.maxX - c.minX}, h=${c.maxY - c.minY}`);
  });
}

findCrops('assets/clues/CPB.png').catch(console.error);
findCrops('assets/clues/NSL.png').catch(console.error);
