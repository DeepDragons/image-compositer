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
  const aura = await eggAura(token);
  const body = await eggBody(token);
  const tails = await eggTails(token);
  const wings = await eggWings(token);

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

  await sharp(empty.canvas, { raw: empty.raw })
    .composite([...backGroundList, {
      input: body
    }])
    .toFile(out);

  console.info(`End generate ${token.id}, File: ${out}`);
}
