import { dragonAura } from './aura';
import { dragonHead } from './head';
import { dragonEyes } from './eyes';
import { dragonTail } from './tail';
import { dragonWings } from './wings';
import { dragonPaws } from './paws';
import { dragon } from './dragon';

import { Token } from '../token';

import genes from '../genes/test.json';

(async function(){
  const genesList = Object.values(genes);
  for (let index = 4000; index < genesList.length; index++) {
    const gene = genesList[index];
    const t = new Token(gene, String(index));
    await dragon(t);
    // await dragonPaws(t);

    // break;
  }
}());
