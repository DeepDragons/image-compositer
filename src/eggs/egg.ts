import type { Token } from "../token";

import sharp from 'sharp';
import rootConfig from '../configs/root';

import { eggAura } from './aura';
import { eggBody } from './body';
import { eggTails } from './tail';
import { eggWings } from './wings';

export async function generateAnEgg(token: Token) {
  console.info("Start generate " + token.id);
  const [aura, body, tails, wings] = await Promise.all([
    eggAura(token),
    eggBody(token),
    eggTails(token),
    eggWings(token)
  ]);

  const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}.png`;
  const backGroundList = [];
  let instance = sharp(body);

  if (aura) {
    instance = sharp(aura);

    if (wings) {
      backGroundList.push({
        input: wings
      });
    }
  
    if (tails) {
      backGroundList.push({
        input: tails
      });
    }
  } else if (wings) {
    instance = sharp(wings);

    if (tails) {
      backGroundList.push({
        input: tails
      });
    }
  } else if (tails) {
    instance = sharp(tails);
  } else {
    return await instance.toFile(out);
  }

  return await instance
    .composite([...backGroundList, {
      input: body
    }])
    .toFile(out);
}
