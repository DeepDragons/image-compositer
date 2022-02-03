import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';
import assert from 'assert';

const DIR_NAME = 'aura';

export async function eggAura(token: Token) {
  assert(token.genes.aura <= 5, "5 aura is max");
  assert(token.genes.aura > 0, "Aura cannot be 0");

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
