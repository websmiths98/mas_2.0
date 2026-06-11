const sharp = require('sharp');
async function run() {
  const { data, info } = await sharp('public/mas_icon_only.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // The checkerboard has light greys and whites.
    // Also the background shadow might be lighter grey.
    // Let's make everything that is relatively bright and unsaturated into transparent.
    // The logo is red and black.
    // Red has high R, low G and B.
    // Black has low R, G, B.
    // Greys/Whites have high R, G, B and are close to each other.
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    // If it's greyish/whitish (diff is small) and it's not dark (max > 100)
    if (diff < 30 && max > 100) {
      if (info.channels === 4) {
        data[i + 3] = 0; // Set alpha to 0
      }
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels
    }
  })
  .png()
  .toFile('public/mas_icon_only_transparent.png');
  console.log('Done!');
}
run();
