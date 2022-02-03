import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

const DIR_NAME = 'aura';

export async function eggAura(token: Token) {
  if (token.genes.aura === 0) {
    return;
  }

  const mask = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.aura}mask.png`;
  const shadow = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.aura}shadow.png`;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}.png`;
  const color = token.genes.colorAura;

  return await sharp(mask)
    .tint(color)
    .composite([
      {
        input: shadow
      }
    ])
    .toBuffer();
}
