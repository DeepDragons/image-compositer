
import * as dotenv from 'dotenv';
import bunyan from 'bunyan';
import { Worker } from 'worker_threads';

import { Dragon } from '../models/dragon';
import { initORM } from '../orm';
import { MainContract } from '../contract/main';
import { Queue, Events } from '../lib/queue';
import path from 'path';

dotenv.config();

const log = bunyan.createLogger({
  name: "SYNC"
});
const one = BigInt(1);
const main = new MainContract();
const eggQueue = new Queue();
const dragonQueue = new Queue();

const eggThread = new Worker(path.join(__dirname, './egg-thread.js'));
const dragonThread = new Worker(path.join(__dirname, './dragon-thread.js'));

async function run(){
  log.info('start sync task');
  try {
    const orm = await initORM();
    const tokenCount = await main.tokenCount();
    const last = await orm.em.count(Dragon);
    const dragon = await orm.em.findOne(Dragon, last);
    if (!dragon) throw new Error('last dragon not found');
    const lastTokenId = BigInt(dragon.tokenId);
    log.info('lastTokenId:', lastTokenId, 'tokenCount:', tokenCount);
    if (tokenCount <= lastTokenId) throw new Error('Skip wait for a new dragon.');
    const ids = [];


    for (let index = BigInt(lastTokenId) + one; index < tokenCount; index += one) {
      ids.push(index);
    }

    log.info(`Added ${ids.length} new dragons!`);

    const genes = await main.getDragons(ids);
    const dragons = genes.map(({ id, chain }) => new Dragon(id, chain));

    await orm.em.persistAndFlush(dragons);

    for (const iterator of dragons) {
      eggQueue.add(BigInt(iterator.tokenId));
      dragonQueue.add(BigInt(iterator.tokenId));
    }
    log.info(`dragons added to egg queue ${dragons.map((d) => d.tokenId).join(', ')}`);
  } catch (err) {
    log.warn((err as Error).message);
  }
}

setInterval(() => {
  if (eggQueue.list.length === 0 && dragonQueue.list.length === 0) {
    run();
  }
}, 10000);

run();

eggQueue.subscribe((id) => {
  eggThread.postMessage(id);
});
dragonQueue.subscribe((id) => {
  dragonThread.postMessage(id);
});

dragonThread.on('message', (data) => {
  if (data && data.event && data.event === Events.Remove) {
    log.info(`Dragon ${data.id} was removed from dragon queue length is ${dragonQueue.list.length}`);
    dragonQueue.remove(BigInt(data.id));
  }
});
dragonThread.on('error', () => {
  dragonThread.terminate();
});
dragonThread.on('exit', (code) => {
  if (code !== 0) dragonThread.terminate();
  return dragonThread;
});

eggThread.on('message', (data) => {
  if (data && data.event && data.event === Events.Remove) {
    log.info(`Egg ${data.id} was removed from eggQueue length is ${eggQueue.list.length}`);
    eggQueue.remove(BigInt(data.id));
  }
});
eggThread.on('error', () => {
  eggThread.terminate();
});
eggThread.on('exit', (code) => {
  if (code !== 0) eggThread.terminate();
  return eggThread;
});
