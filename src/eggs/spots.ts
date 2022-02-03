import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

const DIR_NAME = 'spots';

export async function eggSpots(token: Token) {
  if (token.genes.spots === 0) {
    return;
  }
  const mask = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.spots}mask.png`;
  const color = token.genes.colorSpots;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}.png`;

  return await sharp(mask)
    .tint(color)
    // .toFile(out);
    .toBuffer();
}
