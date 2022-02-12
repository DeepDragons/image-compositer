import { MikroORM } from "@mikro-orm/core";
import config from '../mikro-orm.config';

export async function initORM() {
  return await MikroORM.init({
    entities: config.entities,
    entitiesTs: config.entitiesTs,
    type: 'sqlite',
    dbName: config.dbName,
    debug: false,
    allowGlobalContext: true
  });
}
