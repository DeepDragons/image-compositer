import { generateAnEgg } from './egg';
import { Token } from '../token';

import genes from '../genes/test.json';

(async function(){
  const genesList = Object.values(genes);
  for (let index = 100; index < genesList.length; index++) {
    const gene = genesList[index];
    const t = new Token(gene, String(index));
    await generateAnEgg(t);
  }
}());
