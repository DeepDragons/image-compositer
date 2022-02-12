import bunyan from 'bunyan';
import { parentPort, workerData } from 'worker_threads';

import { Dragon } from '../models/dragon';
import { initORM } from '../orm';
import { generateAnEgg } from '../eggs';
import { Token } from '../token';
import { Events } from '../lib/queue';
import { upload } from '../cloudinary/cloudinary';
import rootConfig from '../configs/root';

const log = bunyan.createLogger({
  name: "EGGS_GEN"
});

(async function(){
  if (!parentPort) {
    log.error('tasks should be started as thread');
    return;
  }

  try {
    const orm = await initORM();

    parentPort.on('message', async (tokenId) => {
      try {
        const egg = await orm.em.findOne(Dragon, {
          tokenId
        });
  
        if (!egg) {
          throw new Error(`token with id ${tokenId} doesn't exists!`);
        }

        egg.eggProcessing = true;

        await orm.em.persistAndFlush(egg);
  
        const token = new Token(egg.face, egg.tokenId);
        await generateAnEgg(token);
        const url = await upload(tokenId, 0, rootConfig.namespase.eggs);
        egg.eggProcessing = false;
        egg.eggUrl = url;
        await orm.em.persistAndFlush(egg);
        parentPort?.postMessage({
          event: Events.Remove,
          id: tokenId
        });
      } catch (err) {
        log.error((err as Error).message);
      }
    });
  } catch (err) {
    log.error(err);
    parentPort.close();
    process.exit(1);
  }
}());
