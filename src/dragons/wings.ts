import type { Token } from '../token';

import bunyan from 'bunyan';
import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'wings';
const log = bunyan.createLogger({
  name: "DRAGON_WINGS"
});

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

  try {
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
    log.error(`${(err as Error).message}, id: ${token.id}, genes: ${token.genes.chain}, gene_number: ${token.genes.tail}, ${mask}`);
    throw err;
  }
}
