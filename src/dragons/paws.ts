import type { Token } from '../token';

import sharp from 'sharp';
import rootConfig from '../configs/root';

const DIR_NAME = 'paws';

export async function dragonPaws(token: Token) {
  const maskL = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.paws}mask_l.png`;
  const maskR = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.paws}mask_r.png`;
  const detailL = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.paws}detail_l.png`;
  const detailR = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.paws}detail_r.png`;

  const shadowL = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.paws}shadow_l.png`;
  const shadowR = `${rootConfig.dragons}/${DIR_NAME}/${token.genes.paws}shadow_r.png`;
  // const out = `${rootConfig.tmp}/${rootConfig.namespase.dragons}/${token.id}.png`;
  const color = token.genes.colorBody;
  const detailColor = token.genes.colorClaws;
  const [clawL, clawR] = await Promise.all([
    sharp(detailL).tint(detailColor).toBuffer(),
    sharp(detailR).tint(detailColor).toBuffer(),
  ]);

  return await Promise.all([
    sharp(maskL).tint(color).composite([
      {
        input: clawL
      },
      {
        input: shadowL
      }
    ]).toBuffer(),
    sharp(maskR).tint(color).composite([
      {
        input: clawR
      },
      {
        input: shadowR
      }
    ]).toBuffer()
  ]);
}
