import type { Token } from '../token';

import bunyan from 'bunyan';
import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'scales';
const log = bunyan.createLogger({
  name: "DRAGON_SCALES"
});

export async function dragonScales(token: Token) {
  if (token.genes.scales === 0) {
    return;
  }

  const mask = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.scales}mask.png`;
  const shadow = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.scales}shadow.png`;
  const color = token.genes.colorScales;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}f.png`;

  try {
    return await sharp(mask)
      .linear(...LINEAR)
      .tint(color)
      .composite([
        {
          input: shadow
        }
      ])
      // .toFile(out);
      .toBuffer();
  } catch (err) {
    log.error(`${(err as Error).message}, id: ${token.id}, genes: ${token.genes.chain}, gene_number: ${token.genes.scales}, ${mask}`);
    throw err;
  }
}
