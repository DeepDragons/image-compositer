import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'scales';

export async function eggScales(token: Token) {
  if (token.genes.scales === 0) {
    return;
  }

  const mask = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.scales}mask.png`;
  const shadow = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.scales}shadow.png`;
  const color = token.genes.colorScales;
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
