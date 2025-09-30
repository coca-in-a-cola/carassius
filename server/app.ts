import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import type { MessageResponse } from './shared';

import api from './api';
import * as middlewares from './middlewares';
import { Player } from './core';
import { dataLoaderService } from './shared/services';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  const data = await dataLoaderService.load();

  res.json(data);
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
