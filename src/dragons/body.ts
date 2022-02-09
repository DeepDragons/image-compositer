import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

import { dragonScales } from './scales';
import { LINEAR } from '../configs/color';
const DIR_NAME = 'bodies';

export async function dragonBody(token: Token) {
  const mask = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.body}mask.png`;
  const shadow = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.body}shadow.png`;
  const color = token.genes.colorBody;
  const [scales] = await Promise.all([
    dragonScales(token)
  ]);
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;

  const list = [];

  if (scales) {
    list.push({
      input: scales
    });
  }

  list.push({
    input: shadow
  });

  const colored = await sharp(mask)
    .linear(...LINEAR)
    .tint(color)
    .toBuffer();

  return await sharp(colored)
    .composite(list)
    .toBuffer();
}
