import type { Token } from "../token";

import sharp from 'sharp';
import rootConfig from '../configs/root';
import empty from '../configs/empty';

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

  if (aura) {
    backGroundList.push({
      input: aura
    });
  }

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

  console.log(await sharp(empty.canvas, { raw: empty.raw }).metadata());

  await sharp(empty.canvas, { raw: empty.raw })
    .composite([...backGroundList, {
      input: body
    }])
    .toFile(out);

  console.info(`End generate ${token.id}, File: ${out}`);
}
