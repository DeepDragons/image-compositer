import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

const DIR_NAME = 'scales';

export async function dragonScales(token: Token) {
  if (token.genes.scales === 0) {
    return;
  }

  const mask = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.scales}mask.png`;
  const shadow = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.scales}shadow.png`;
  const color = token.genes.colorScales;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;

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
