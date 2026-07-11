const { Jimp } = require('jimp');

async function findRegions(imagePath) {
  const img = await Jimp.read(imagePath);
  const w = img.bitmap.width;
  const h = img.bitmap.height;
  
  const visited = new Uint8Array(w * h);
  const regions = [];

  for (let y = 0; y < h; y += 4) {
    for (let x = 0; x < w; x += 4) {
      if (visited[y * w + x]) continue;
      
      const idx = (w * y + x) << 2;
      const alpha = img.bitmap.data[idx + 3];
      
      if (alpha > 20) {
        // Flood fill to find bounds
        let minX = x, maxX = x, minY = y, maxY = y;
        const queue = [{x, y}];
        visited[y * w + x] = 1;
        
        let head = 0;
        while (head < queue.length) {
          const p = queue[head++];
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
          
          // Check neighbors
          const dirs = [[-4,0], [4,0], [0,-4], [0,4]];
          for (const d of dirs) {
            const nx = p.x + d[0];
            const ny = p.y + d[1];
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              if (!visited[ny * w + nx]) {
                const nidx = (w * ny + nx) << 2;
                if (img.bitmap.data[nidx + 3] > 20) {
                  visited[ny * w + nx] = 1;
                  queue.push({x: nx, y: ny});
                }
              }
            }
          }
        }
        
        // Only keep significant regions
        if (maxX - minX > 50 && maxY - minY > 50) {
          regions.push({ x: minX, y: minY, w: maxX - minX, h: maxY - minY });
        }
      }
    }
  }
  
  console.log(`Regions for ${imagePath}:`);
  regions.sort((a, b) => a.x - b.x); // sort left to right
  regions.forEach((r, i) => console.log(`Region ${i+1}: x: ${r.x}, y: ${r.y}, w: ${r.w}, h: ${r.h}`));
}

(async () => {
  await findRegions('assets/dbw.png');
  await findRegions('assets/BTC.png');
})();
