import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';
import bunyan from 'bunyan';

const DIR_NAME = 'tails';
const log = bunyan.createLogger({
  name: "EGGS_TAIL"
});

export async function eggTails(token: Token) {
  if (token.genes.tail === 0) {
    return;
  }

  try {
    const mask = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.tail}mask.png`;
    const detail = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.tail}detail.png`;
    const shadow = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.tail}shadow.png`;
    const colorMask = token.genes.colorTail;
    const colorDetail = token.genes.colorChunkTail;
    // const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}.png`;
  
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
    log.error(`${(err as Error).message}, id: ${token.id}, genes: ${token.genes.chain}, gene_number: ${token.genes.tail}`);
    throw err;
  }
}
