import BN from 'bn.js';
import { Dragon } from '../models/dragon';
import { MainContract } from '../contract/main';
import { initORM } from '../orm';

(async function() {
  const orm = await initORM();
  const genes = await new MainContract().getAllFaces();
  const list = Object.keys(genes).sort((a, b) => {
    if (new BN(a).gt(new BN(b))) {
      return 1;
    }

    return -1;
  }).map((id) => new Dragon(id, genes[id]));

  await orm.em.persistAndFlush(list);
}());
