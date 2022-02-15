import BN from 'bn.js';
import { Dragon } from '../models/dragon';
import { MainContract } from '../contract/main';
import { initORM } from '../orm';
import * as dotenv from 'dotenv';

dotenv.config();

const main = new MainContract();
(async function() {
  const orm = await initORM();
  const genes = await main.getAllFaces();
  const uris = await main.getUris();
  const list = Object.keys(genes).sort((a, b) => {
    if (new BN(a).gt(new BN(b))) {
      return 1;
    }

    return -1;
  }).map((id) => {
    const d = new Dragon(id, genes[id]);
    d.dragonUrl = uris[id];
    d.eggUrl = uris[id];

    return d;
  });

  await orm.em.persistAndFlush(list);

  await orm.close();
}());
