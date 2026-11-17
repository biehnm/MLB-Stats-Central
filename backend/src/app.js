import express from 'express';
import { fileURLToPath } from 'node:url';
import { createApiRouter } from './routes.js';

const frontendDir = fileURLToPath(new URL('../../frontend/dist/', import.meta.url));

export function createApp(repositories) {
  const app = express();

  app.use('/api', createApiRouter(repositories));
  app.get(['/', '/index.html', '/teams.html', '/games.html'], (_req, res) => {
    res.sendFile('index.html', { root: frontendDir });
  });
  app.use(express.static(frontendDir, { index: false }));

  app.use((error, _req, res, next) => {
    if (res.headersSent) {
      next(error);
      return;
    }
    if (error.status === 404) {
      res.sendStatus(404);
      return;
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  });

  return app;
}
