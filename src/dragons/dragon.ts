import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';
import empty from '../configs/empty';

import { dragonSpots } from './spots';
import { dragonPaws } from './paws';
import { dragonHead } from './head';
import { dragonBody } from './body';
import { dragonTail } from './tail';
import { dragonWings } from './wings';

export async function dragon(token: Token) {
  const [paws, head, body, tail, wings] = await Promise.all([
    // dragonSpots(token),
    dragonPaws(token),
    dragonHead(token),
    dragonBody(token),
    dragonTail(token),
    dragonWings(token)
  ]);
  const [pawsL, pawsR] = paws;
  const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;
  const list = [];
  let instance = sharp(pawsR);

  if (wings) {
    instance = sharp(wings);
    list.push({
      input: pawsR
    });
  }

  list.push({
    input: body
  });
  list.push({
    input: head
  });
  list.push({
    input: pawsL
  });

  if (tail) {
    list.push({
      input: tail
    });
  }

  return await instance
    .composite(list)
    .toFile(out);
}
