import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

const DIR_NAME = 'scales';

export async function eggScales(token: Token) {
  const mask = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.scales}mask.png`;
  const shadow = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.scales}shadow.png`;
  const color = token.genes.colorScales;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}.png`;

  return await sharp(mask)
    .tint(color)
    .composite([
      {
        input: shadow
      }
    ])
    // .toFile(out);
    .toBuffer();
}
