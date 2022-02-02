import type { Token } from '../token';

import gm from 'gm';
import fs from 'fs';
import rootConfig from '../configs/root';
import assert from 'assert';

const DIR_NAME = 'aura';

export function eggAura(token: Token) {
  assert(token.genes.aura <= 5, "5 aura is max");
  assert(token.genes.aura > 0, "Aura cannot be 0");

  const mask = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.aura}mask.png`;
  const shadow = `${rootConfig.eggs}/${DIR_NAME}/${token.genes.aura}shadow.png`;
  const out = `${rootConfig.tmp}/${rootConfig.namespase.eggs}/${token.id}.png`;
  const color = token.genes.colorAura;
  const writeStream = fs.createWriteStream(out);

  gm(mask)
    .colorize(color.r, color.g, color.b)
    .stream()
    .pipe(writeStream);
}
