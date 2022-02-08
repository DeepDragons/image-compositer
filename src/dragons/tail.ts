import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

const DIR_NAME = 'tails';

export async function dragonTail(token: Token) {
  if (token.genes.tail === 0) {
    return;
  }

  const mask = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.tail}mask.png`;
  const detail = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.tail}detail.png`;
  const shadow = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.tail}shadow.png`;
  const colorMask = token.genes.colorTail;
  const colorDetail = token.genes.colorChunkTail;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;

  const tailMask = await sharp(mask)
    .tint(colorMask)
    .toBuffer();
  const tailDetail = await sharp(detail)
    .tint(colorDetail)
    .toBuffer();
  return await sharp(tailMask)
    .composite([
      {
        input: tailDetail
      },
      {
        input: shadow
      }
    ])
    .toBuffer();
    // .toFile(out);
}
