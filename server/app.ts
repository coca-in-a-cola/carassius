import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import path from 'path';
import * as middlewares from './middlewares';
import { gameSystem } from './core/systems';
import { dataLoaderService } from './shared/services';
import { setApiRoutes } from './api/api.routes';

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
      'img-src': ['\'self\'', 'https: data: blob:']
    },
  },
}));
app.use(cors());
app.use(express.json());

const router = Router();
setApiRoutes(router);

app.use('/api', router);

app.use('/', express.static(path.join(__dirname, './public')));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));


app.get('/*splat', (req, res) => {
  if (req.url?.split('/')?.[1] === 'api') {
    res.sendStatus(404);
    return;
  }


  const indexPath = path.join(__dirname, './public/index.html');
  res.sendFile(indexPath);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

dataLoaderService.load().then((data) => {
  gameSystem.initialize(data);
  console.log(`Game data initialized with:
    ${data.cards.length} Cards,
    ${data.effects.length} Effects,
    ${data.requirements.length} Requirements\n\n====`);
});

export default app;
