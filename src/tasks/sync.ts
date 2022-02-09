import { Dragon } from '../models/dragon';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { initORM } from '../orm';

(async function (){
  const orm = await initORM();

    const dragon = new Dragon('13', '77730010004011022227013071234');
    await orm.em.persistAndFlush([dragon]);
}());
