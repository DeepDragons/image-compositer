import type { Token } from '../token';

import bunyan from 'bunyan';
import sharp from 'sharp';
import rootConfig from '../configs/root';
import { LINEAR } from '../configs/color';

const DIR_NAME = 'paws';
const log = bunyan.createLogger({
  name: "DRAGON_PAWS"
});

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

  try {
    const [clawL, clawR] = await Promise.all([
      sharp(detailL).linear(...LINEAR).tint(detailColor).toBuffer(),
      sharp(detailR).linear(...LINEAR).tint(detailColor).toBuffer(),
    ]);
  
    return await Promise.all([
      sharp(maskL).linear(...LINEAR).tint(color).composite([
        {
          input: clawL
        },
        {
          input: shadowL
        }
      ]).toBuffer(),
      sharp(maskR).linear(...LINEAR).tint(color).composite([
        {
          input: clawR
        },
        {
          input: shadowR
        }
      ]).toBuffer()
    ]);
  } catch (err) {
    log.error(`${(err as Error).message}, id: ${token.id}, genes: ${token.genes.chain}, gene_number: ${token.genes.paws}, ${maskL} ${maskR}`);
    throw err;
  }
}
