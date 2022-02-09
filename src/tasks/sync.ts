
import { Dragon } from '../models/dragon';
import { EntityManager, MikroORM, QueryOrder } from '@mikro-orm/core';
import { initORM } from '../orm';
import { MainContract } from '../contract/main';
import { BN } from 'bn.js';

const main = new MainContract();

(async function (){
  const orm = await initORM();
  const tokenCount = await main.tokenCount();
  const last = await orm.em.count(Dragon);
  const dragon = await orm.em.findOne(Dragon, last);

  if (!dragon) {
    return;
  }

  const lastTokenId = new BN(dragon.tokenId);

  console.log(tokenCount.gt(lastTokenId));

  // const dragon = new Dragon('13', '77730010004011022227013071234');
  // await orm.em.persistAndFlush([dragon]);
}());
