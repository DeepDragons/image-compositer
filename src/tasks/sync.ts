import { Dragon } from '../models/dragon';
import { EntityManager, MikroORM, QueryOrder } from '@mikro-orm/core';
import { initORM } from '../orm';

(async function (){
  const orm = await initORM();

  const last = await orm.em.count(Dragon);
  const dragon = await orm.em.findOne(Dragon, last);

  console.log(dragon);

  // const dragon = new Dragon('13', '77730010004011022227013071234');
  // await orm.em.persistAndFlush([dragon]);
}());
