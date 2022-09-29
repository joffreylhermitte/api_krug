import express from 'express';
import bodyParser from 'body-parser';
import { Container } from 'typedi';

import config from './src/config';
import Logger from './src/loaders/logger';

async function startServer() {
  const app = express();

  await require('./src/loaders').default({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    console.log(`
      ################################################
      	   Server listening on port: ${config.port}
      ################################################
    `);
  });

}

startServer();
