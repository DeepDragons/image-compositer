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
  const [spots, scales, horns] = await Promise.all([
    eggSpots(token),
    eggScales(token),
    eggHorns(token)
  ]);
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}s.png`;

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

  const colored = await sharp(mask).tint(color).toBuffer();

  return await sharp(colored)
    .composite(list)
    // .toFile(out)
    .toBuffer();
}
