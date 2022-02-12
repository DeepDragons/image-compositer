import bunyan from 'bunyan';
import { parentPort } from 'worker_threads';

import { Dragon } from '../models/dragon';
import { initORM } from '../orm';
import { generateAdragon } from '../dragons';
import { Token } from '../token';
import { Events } from '../lib/queue';
import { upload } from '../cloudinary/cloudinary';
import rootConfig from '../configs/root';

const log = bunyan.createLogger({
  name: "DRAGON_GEN"
});

log.info('Worker just have started.');

(async function(){
  if (!parentPort) {
    log.error('tasks should be started as thread');
    return;
  }

  try {
    const orm = await initORM();

    parentPort.on('message', async (tokenId) => {
      log.info(`Start generate dragon ${tokenId}`);
      const dragon = await orm.em.findOne(Dragon, {
        tokenId
      });

      if (!dragon) {
        log.error(`token with id ${tokenId} doesn't exists!`);
        return;
      }

      try {
        dragon.eggProcessing = true;

        await orm.em.persistAndFlush(dragon);
  
        const token = new Token(dragon.face, dragon.tokenId);
        await generateAdragon(token);
        const url = await upload(tokenId, 1, rootConfig.namespase.dragons);
        dragon.dragonProcessing = false;
        dragon.dragonUrl = url;
        await orm.em.persistAndFlush(dragon);
        parentPort?.postMessage({
          event: Events.Remove,
          id: tokenId
        });
        log.info(`End generate egg ${tokenId}`);
      } catch (err) {
        log.error((err as Error).message);
        dragon.eggProcessing = false;
        dragon.eggUrl = undefined;
        await orm.em.persistAndFlush(dragon);
      }
    });
  } catch (err) {
    log.error('Worker down by error: ', err);
    parentPort.close();
    process.exit(1);
  }
}());
