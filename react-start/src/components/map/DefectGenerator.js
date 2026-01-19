// DefectGenerator.js
// Wafer Defect Data Generator for Cartesian coordinates
export const generateDefects = (params, numRandom, numClusters, numScratches, seed = 0) => {
  
  const defects = [];
  const random = (s) => { // Seeded random for consistent defects if needed
    if (s === 0) return Math.random();
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };
  let currentSeed = seed;
  let range = (params.waferSize - 2 * params.waferEdge) / 2; // Wafer radius in data units

  // Helper for generating Gaussian-like distribution
  const gaussianRandom = (center, spread) => center + ((random(currentSeed++) + random(currentSeed++) + random(currentSeed++) - 1.5) * spread);

  // 1. Random Defects
  for (let i = 0; i < numRandom; i++) {
    //const x = (random(currentSeed++) * 2 - 1) * range;
    //const y = (random(currentSeed++) * 2 - 1) * range;
    const min = -range;
    const max = range;
    const x = Math.floor(Math.random() * (max - min + 1)) + min;
    const y = (random(currentSeed++) * 2 - 1) * range;
    if (Math.sqrt(x*x + y*y) < range) {
      defects.push({ id: `R${i}`, x, y, type: 'Random', color: '#130ffa', size: 1000 + random(currentSeed++) * 1000 }); // Yellow
    }
  }

  // 2. Cluster Defects
  for (let c = 0; c < numClusters; c++) {
    const clusterCenterX = (random(currentSeed++) * 2 - 1) * range * 0.6;
    const clusterCenterY = (random(currentSeed++) * 2 - 1) * range * 0.6;
    const clusterSpread = range * (0.02 + random(currentSeed++) * 0.03); // Randomize cluster spread

    for (let i = 0; i < 50; i++) { // 50 defects per cluster
      const x = gaussianRandom(clusterCenterX, clusterSpread);
      const y = gaussianRandom(clusterCenterY, clusterSpread);
      if (Math.sqrt(x*x + y*y) < range) {
        defects.push({ id: `C${c}-${i}`, x, y, type: 'Cluster', color: '#be0b0b', size: 800 + random(currentSeed++) * 800 }); // Orange
      }
    }
  }

  // 3. Scratch Defects
  for (let s = 0; s < numScratches; s++) {
    const startX = (random(currentSeed++) * 2 - 1) * range * 0.7;
    const startY = (random(currentSeed++) * 2 - 1) * range * 0.7;
    const endX = (random(currentSeed++) * 2 - 1) * range * 0.7;
    const endY = (random(currentSeed++) * 2 - 1) * range * 0.7;
    const scratchLength = Math.sqrt((endX - startX)**2 + (endY - startY)**2);

    if (scratchLength > range * 0.1) { // Only long enough scratches
      for (let i = 0; i < 20; i++) { // 20 defects per scratch
        const ratio = i / 19;
        const noiseX = (random(currentSeed++) - 0.5) * (range * 0.01);
        const noiseY = (random(currentSeed++) - 0.5) * (range * 0.01);
        const x = startX + (endX - startX) * ratio + noiseX;
        const y = startY + (endY - startY) * ratio + noiseY;
        if (Math.sqrt(x*x + y*y) < range) {
          defects.push({ id: `S${s}-${i}`, x, y, type: 'Scratch', color: '#F44336', size: 1200 + random(currentSeed++) * 1200 }); // Red
        }
      }
    }
  }
  return defects;
};