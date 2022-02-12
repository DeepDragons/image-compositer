import type { Token } from '../token';

import bunyan from 'bunyan';
import sharp from 'sharp';

import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'aura';
const log = bunyan.createLogger({
  name: "EGG_AURA"
});

export async function eggAura(token: Token) {
  if (token.genes.aura === 0) {
    return;
  }

  const mask = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.aura}mask.png`;
  const shadow = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.aura}shadow.png`;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}s.png`;
  const color = token.genes.colorAura;

  try {
    return await sharp(mask)
      .linear(...LINEAR)
      .tint(color)
      .modulate({
        brightness: 100,
        lightness: 100
      })
      .composite([
        {
          input: shadow
        }
      ])
      .toBuffer();
  } catch (err) {
    log.error(`${(err as Error).message}, id: ${token.id}, genes: ${token.genes.chain}, gene_number: ${token.genes.aura}, ${mask}`);
    throw err;
  }
}
