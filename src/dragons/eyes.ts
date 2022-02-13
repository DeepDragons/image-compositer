import type { Token } from '../token';

import bunyan from 'bunyan';
import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'eyes';
const log = bunyan.createLogger({
  name: "DRAGON_EYES"
});

export async function dragonEyes(token: Token) {
  const mask = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.eyes}mask.png`;
  const detail = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.eyes}detail.png`;
  const shadow = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.eyes}shadow.png`;
  const colorMask = token.genes.colorEyes;
  const colorDetail = token.genes.colorChunkEyes;

  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;

  try {
    const [eyesMask, eyesDetail] = await Promise.all([
      sharp(mask).linear(...LINEAR).tint(colorMask).toBuffer(),
      sharp(detail).linear(...LINEAR).tint(colorDetail).toBuffer()
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
  } catch (err) {
    log.error(`${(err as Error).message}, id: ${token.id}, genes: ${token.genes.chain}, gene_number: ${token.genes.eyes}, ${mask}`);
    throw err;
  }
}
