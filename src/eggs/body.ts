import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

import { eggSpots } from './spots';
import { eggScales } from './scales';
import { eggHorns } from './horns';

const DIR_NAME = 'bodies';

export async function eggBody(token: Token) {
  const mask = `${rootConfig.eggs}/${DIR_NAME}/0mask.png`;
  const shadow = `${rootConfig.eggs}/${DIR_NAME}/0shadow.png`;
  const color = token.genes.colorBody;
  const spots = await eggSpots(token);
  const scales = await eggScales(token);
  const horns = await eggHorns(token);
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}.png`;

  const list = [];

  if (spots) {
    list.push({
      input: spots
    });
  }

  if (scales) {
    list.push({
      input: scales
    });
  }

  list.push({
    input: shadow
  });

  if (horns) {
    list.push({
      input: horns
    });
  }

  return await sharp(mask)
    .tint(color)
    .composite(list)
    // .toFile(out)
    .toBuffer();
}
