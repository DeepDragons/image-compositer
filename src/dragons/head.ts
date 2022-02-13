import type { Token } from '../token';

import bunyan from 'bunyan';
import sharp from 'sharp';
import rootConfig from '../configs/root';

import { dragonEyes } from './eyes';
import { dragonHorns } from './horns';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'heads';
const log = bunyan.createLogger({
  name: "DRAGON_HEAD"
});

export async function dragonHead(token: Token) {
  const mask = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.head}mask.png`;
  const shadow = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.head}shadow.png`;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;
  const color = token.genes.colorBody;
  const [eyes, horns] = await Promise.all([
    dragonEyes(token),
    dragonHorns(token)
  ]);

  try {
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

    if (horns && horns.length > 0) {
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
  } catch (err) {
    log.error(`${(err as Error).message}, id: ${token.id}, genes: ${token.genes.chain}, gene_number: ${token.genes.head}, ${mask}`);
    throw err;
  }
}
