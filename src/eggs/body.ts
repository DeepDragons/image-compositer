import type { Token } from '../token';

import bunyan from 'bunyan';
import sharp from 'sharp';
import rootConfig from '../configs/root';

import { eggSpots } from './spots';
import { eggScales } from './scales';
import { eggHorns } from './horns';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'bodies';
const log = bunyan.createLogger({
  name: "EGG_BODY"
});

export async function eggBody(token: Token) {
  const [spots, scales, horns] = await Promise.all([
    eggSpots(token),
    eggScales(token),
    eggHorns(token)
  ]);

  try {
    const mask = `${rootConfig.eggs}/${DIR_NAME}/0mask.png`;
    const shadow = `${rootConfig.eggs}/${DIR_NAME}/0shadow.png`;
    const color = token.genes.colorBody;
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
  
    const colored = await sharp(mask)
      .linear(...LINEAR)
      .tint(color)
      .toBuffer();
  
    return await sharp(colored)
      .composite(list)
      // .toFile(out)
      .toBuffer();
  } catch (err) {
    log.error(`${(err as Error).message}, id: ${token.id}, genes: ${token.genes.chain}`);
    throw err;
  }
}
