import { MikroORM, IDatabaseDriver, Connection } from '@mikro-orm/core';
import { Router, Request, Response } from 'express';
import { Dragon } from '../../models/dragon';

export const dragons = Router();

dragons.get('/dragon', async (req: Request, res: Response) => {
  const orm: MikroORM<IDatabaseDriver<Connection>> = req.app.get('orm');

  try {
    // @ts-ignore
    const repo = orm.em.getRepository(Dragon);
    const tokens = await repo.findAll();

    res.status(201).json(tokens);
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: (err as Error).message
    });
  }
});


dragons.delete('/dragon/reset/:id', async (req: Request, res: Response) => {
  const orm: MikroORM<IDatabaseDriver<Connection>> = req.app.get('orm');
  const id = req.params.id;

  try {
    // @ts-ignore
    const repo = orm.em.getRepository(Dragon);
    const token = await repo.findOne({
      tokenId: id
    });

    if (token) {
      token.dragonProcessing = false;
      token.dragonUrl = undefined;

      await repo.persistAndFlush([token]);
    }

    res.status(201).json(token);
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: (err as Error).message
    });
  }
});
