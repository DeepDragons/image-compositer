import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

const DIR_NAME = 'eyes';

export async function dragonEyes(token: Token) {
  const mask = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.eyes}mask.png`;
  const detail = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.eyes}detail.png`;
  const shadow = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.eyes}shadow.png`;
  const colorMask = token.genes.colorEyes;
  const colorDetail = token.genes.colorChunkEyes;

  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;

  const [eyesMask, eyesDetail] = await Promise.all([
    sharp(mask).tint(colorMask).toBuffer(),
    sharp(detail).tint(colorDetail).toBuffer()
  ]);

  return await sharp(eyesMask)
    .composite([
      {
        input: eyesDetail
      },
      {
        input: shadow
      }
    ])
    .toBuffer();
    // .toFile(out);
}
