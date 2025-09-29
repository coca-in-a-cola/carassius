import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import type MessageResponse from './shared/message-response';

import api from './api';
import * as middlewares from './middlewares';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<object, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
