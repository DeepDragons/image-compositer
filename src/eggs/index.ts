import { generateAnEgg } from './egg';
import { Token } from '../token';

import genes from '../genes/test.json';

const sleep = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(null);
  }, 500);
});

(async function(){
  const genesList = Object.values(genes);
  for (let index = 0; index < genesList.length; index++) {
    const gene = genesList[index];
    const t = new Token(gene, String(index));
    generateAnEgg(t);

    await sleep();
  }
}());
