import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

const DIR_NAME = 'horns';

export async function eggHorns(token: Token) {
  if (token.genes.horns === 0) {
    return;
  }
  const mask = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.horns}mask.png`;
  const shadow = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.horns}shadow.png`;
  const color = token.genes.colorHorns;
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
