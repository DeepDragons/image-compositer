import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

const DIR_NAME = 'bodies';

export async function eggBoddy(token: Token) {
  const mask = `${rootConfig.eggs}/${DIR_NAME}/0mask.png`;
  const shadow = `${rootConfig.eggs}/${DIR_NAME}/0shadow.png`;
  const color = token.genes.colorBody;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}.png`;

  return await sharp(mask)
    .tint(color)
    .composite([
      {
        input: shadow
      }
    ])
    // .toFile(out)
    .toBuffer();
}
