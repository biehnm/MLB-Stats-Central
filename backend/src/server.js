import { createApp } from './app.js';
import { pool } from './db.js';
import { createRepositories } from './repositories.js';

const port = Number(process.env.PORT || 8080);
const app = createApp(createRepositories(pool));

app.listen(port, () => {
  console.log(`MLB Stats Central listening on http://localhost:${port}`);
});
