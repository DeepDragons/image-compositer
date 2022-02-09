import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

import { dragonEyes } from './eyes';
import { dragonHorns } from './horns';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'heads';

export async function dragonHead(token: Token) {
  const mask = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.head}mask.png`;
  const shadow = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.head}shadow.png`;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;
  const color = token.genes.colorBody;
  const [eyes, horns] = await Promise.all([
    dragonEyes(token),
    dragonHorns(token)
  ]);
  const head = await sharp(mask)
    .linear(...LINEAR)
    .tint(color)
    .composite([
      {
        input: eyes
      },
      {
        input: shadow
      }
    ]).toBuffer();

  if (horns.length > 0) {
    const [hornL, hornR] = horns;
    return await sharp(hornR)
      .composite([
        {
          input: head
        },
        {
          input: hornL
        },
      ])
      .toBuffer()
      // .toFile(out);
  }

  return head;
}
