
import bunyan from 'bunyan';
import { Worker } from 'worker_threads';

import { Dragon } from '../models/dragon';
import { EntityManager, MikroORM, QueryOrder } from '@mikro-orm/core';
import { initORM } from '../orm';
import { MainContract } from '../contract/main';
import { Queue } from '../lib/queue';
import path from 'path';

const log = bunyan.createLogger({
  name: "SYNC"
});
const one = BigInt(1);
const main = new MainContract();
const queue = new Queue();

const eggThread = new Worker(path.join(__dirname, './egg-thread.js'));

eggThread.postMessage('3016');

eggThread.on('message', function (data) {
  console.log('In Message', data);
});
eggThread.on('error', function (error) {
  eggThread.terminate();
});
eggThread.on('exit', (code) => {
  if (code !== 0) eggThread.terminate();
  return eggThread;
});

// (async function (){
//   log.info('start sync task');
//   try {
//     const orm = await initORM();
//     const tokenCount = await main.tokenCount();
//     const last = await orm.em.count(Dragon);
//     const dragon = await orm.em.findOne(Dragon, last);
//     if (!dragon) throw new Error('last dragon not found');
//     const lastTokenId = BigInt(dragon.tokenId);
//     if (tokenCount <= lastTokenId) throw new Error('Skip wait for a new dragon.');
//     const ids = [];

//     for (let index = BigInt(lastTokenId) + one; index < tokenCount; index += one) {
//       ids.push(index);
//     }

//     const genes = await main.getDragons(ids);
//     const dragons = genes.map(({ id, chain }) => new Dragon(id, chain));

//     await orm.em.persistAndFlush(dragons);

//     for (const iterator of dragons) {
//       queue.add(BigInt(iterator.tokenId));
//     }
//   } catch (err) {
//     log.warn((err as Error).message);
//   }
// }());
