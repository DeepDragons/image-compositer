import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'horns';

export async function eggHorns(token: Token) {
  if (token.genes.horns === 0) {
    return;
  }
  const mask = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.horns}mask.png`;
  const shadow = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.horns}shadow.png`;
  const color = token.genes.colorHorns;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}.png`;

  const colored = await sharp(mask)
    .linear(...LINEAR)
    .tint(color)
    .toBuffer();

  return await sharp(colored)
    .composite([
      {
        input: shadow
      }
    ])
    // .toFile(out);
    .toBuffer();
}
