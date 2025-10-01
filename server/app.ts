import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import { setupGameRoutes } from './game/game.routes';
import * as middlewares from './middlewares';
import { dataLoaderService } from './shared/services';
import path from 'path';

const app = express();

app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
		"img-src": ["'self'", "https: data: blob:"]
      },
    },
  }));
app.use(cors());
app.use(express.json());

const router = Router();
setupGameRoutes(router);

app.use('/api', router);


app.use('/', express.static(path.join(__dirname, '../build')));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));

app.get('/*splat', (req, res) => {
  if (req.url?.split('/')?.[1] === 'api') {
    res.sendStatus(HttpCodes.NOT_FOUND);
    return;
  }

  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use(middlewares.errorHandler);

export default app;
