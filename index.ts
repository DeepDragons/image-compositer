import * as dotenv from 'dotenv';

dotenv.config();

import { generateAnEgg } from './src/eggs/egg';
import { dragon } from './src/dragons/dragon';

import { Token } from './src/token';

import genes from './src/genes/test.json';

(async function(){
  const genesList = Object.values(genes);
  for (let index = 4000; index < genesList.length; index++) {
    const gene = genesList[index];
    const t = new Token(gene, String(index));
    await generateAnEgg(t);
    await dragon(t);

    // break;
  }
}());
