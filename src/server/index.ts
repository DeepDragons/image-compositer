
// Import the express in typescript file
import express from 'express';
import bodyParser from 'body-parser';

import { router } from './routers';
import { initORM } from '../orm';
 

// Initialize the express engine
const app: express.Application = express();
 
// Take a port 3000 for running server.
const port: number = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
 
// Handling '/' Request
app.get('/health', (_req, _res) => {
  _res.send("health 200");
});

(async function(){
  const orm = await initORM();

  app.set('orm', orm);

  // Server setup
  app.listen(port, () => {
    console.log(`TypeScript with Express http://localhost:${port}/`);
  });
}());
