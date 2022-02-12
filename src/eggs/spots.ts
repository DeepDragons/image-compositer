import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';
import bunyan from 'bunyan';

const DIR_NAME = 'spots';
const log = bunyan.createLogger({
  name: "EGGS_SPOTS"
});

export async function eggSpots(token: Token) {
  if (token.genes.spots === 0) {
    return;
  }

  try {
    const mask = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.spots}mask.png`;
    const color = token.genes.colorSpots;
    // const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}.png`;
  
    return await sharp(mask)
      .linear(...LINEAR)
      .tint(color)
      // .toFile(out);
      .toBuffer();
  } catch (err) {
    log.error(`${(err as Error).message}, id: ${token.id}, genes: ${token.genes.chain}, gene_number: ${token.genes.spots}`);
    throw err;
  }
}
