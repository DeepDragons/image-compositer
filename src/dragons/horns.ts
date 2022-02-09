import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'horns';

export async function dragonHorns(token: Token) {
  if (token.genes.horns === 0) {
    return [];
  }
  const maskL = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.horns}mask_l.png`;
  const maskR = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.horns}mask_r.png`;
  const shadowL = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.horns}shadow_l.png`;
  const shadowR = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.horns}shadow_r.png`;
  const colorMask = token.genes.colorHorns;

  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;

  return await Promise.all([
    sharp(maskL).linear(...LINEAR).tint(colorMask).composite([{
      input: shadowL
    }]).toBuffer(),
    sharp(maskR).linear(...LINEAR).tint(colorMask).composite([{
      input: shadowR
    }]).toBuffer()
  ]);
}
