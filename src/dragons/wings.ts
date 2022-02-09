import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'wings';

export async function dragonWings(token: Token) {
  if (token.genes.wings === 0) {
    return;
  }
  const mask = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.wings}mask.png`;
  const detail = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.wings}detail.png`;
  const shadow = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.wings}shadow.png`;
  const colorMask = token.genes.colorChunkWings;
  const colorDetail = token.genes.colorWings;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;

  const wingsMask = await sharp(mask)
    .linear(...LINEAR)
    .tint(colorMask)
    .toBuffer();
  const wingsDetail = await sharp(detail)
    .linear(...LINEAR)
    .tint(colorDetail)
    .toBuffer();
  return await sharp(wingsMask)
    .composite([
      {
        input: wingsDetail
      },
      {
        input: shadow
      }
    ])
    .toBuffer();
    // .toFile(out);
}
