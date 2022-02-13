import type { Token } from '../token';

import bunyan from 'bunyan';
import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'tails';
const log = bunyan.createLogger({
  name: "DRAGON_TAIL"
});

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

  try {
    const tailMask = await sharp(mask)
    .linear(...LINEAR)
    .tint(colorMask)
    .toBuffer();
    const tailDetail = await sharp(detail)
      .linear(...LINEAR)
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
  } catch (err) {
    log.error(`${(err as Error).message}, id: ${token.id}, genes: ${token.genes.chain}, gene_number: ${token.genes.tail}, ${mask}`);
    throw err;
  }
}
