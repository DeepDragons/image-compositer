import { Dragon } from '../models/dragon';
import { MainContract } from '../contract/main';
import { initORM } from '../orm';

(async function() {
  const orm = await initORM();
  const genes = await new MainContract().getAllFaces();
  const list = [];

  for (const id in genes) {
    const gene = genes[id];
    list.push(new Dragon(id, gene));

    if (list.length > 50) {
      await orm.em.persistAndFlush(list);
      list.length = 0;
    }
  }
}());
