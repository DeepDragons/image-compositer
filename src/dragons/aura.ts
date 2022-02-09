import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'aura';

export async function dragonAura(token: Token) {
  if (token.genes.aura === 0) {
    return;
  }

  const mask = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.aura}mask.png`;
  const shadow = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.aura}shadow.png`;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;
  const color = token.genes.colorAura;

  if (token.genes.aura === 1) {
    return await sharp(mask)
    .linear(...LINEAR)
    .tint(color)
    .modulate({
      brightness: 100,
      lightness: 100
    })
    .toBuffer();
  }

  return await sharp(mask)
    .linear(...LINEAR)
    .tint(color)
    .modulate({
      brightness: 100,
      lightness: 100
    })
    .composite([
      {
        input: shadow
      }
    ])
    // .toFile(out);
    .toBuffer();
}
