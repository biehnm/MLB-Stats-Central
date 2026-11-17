import cors from 'cors';
import { Router } from 'express';

function collectionRoutes(repository) {
  const router = Router();

  router.get('/', async (_req, res) => {
    res.json(await repository.findAll());
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const number = Number(id);
    if (!/^[+-]?\d+$/.test(id) || number < -2147483648 || number > 2147483647) {
      res.status(400).json({ error: 'ID must be a valid integer.' });
      return;
    }

    const row = await repository.findById(number);
    if (row === undefined) {
      res.end();
      return;
    }
    res.json(row);
  });

  return router;
}

export function createApiRouter({ players, teams, games }) {
  const router = Router();
  router.use('/players', cors({ methods: ['GET', 'HEAD'] }), collectionRoutes(players));
  router.use('/teams', collectionRoutes(teams));
  router.use('/games', collectionRoutes(games));
  router.use((_req, res) => res.status(404).json({ error: 'API route not found.' }));
  return router;
}
