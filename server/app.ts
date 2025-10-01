import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import { setupGameRoutes } from './game/game.routes';
import * as middlewares from './middlewares';
import { dataLoaderService } from './shared/services';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const router = Router();
setupGameRoutes(router);

app.use('/api', router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.get('/', async (req, res) => {
  const data = await dataLoaderService.load();

  res.json(data);
});


export default app;
