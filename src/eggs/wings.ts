import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';
import bunyan from 'bunyan';

const DIR_NAME = 'wings';
const log = bunyan.createLogger({
  name: "EGGS_WINGS"
});

export async function eggWings(token: Token) {
  if (token.genes.wings === 0) {
    return;
  }

  try {
    const mask = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.wings}mask.png`;
    const detail = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.wings}detail.png`;
    const shadow = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.wings}shadow.png`;
    const colorMask = token.genes.colorWings;
    const colorDetail = token.genes.colorChunkWings;
    // const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}.png`;
  
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
  } catch (err) {
    log.error(`${(err as Error).message}, id: ${token.id}, genes: ${token.genes.chain}, gene_number: ${token.genes.wings}`);
    throw err;
  }
}
