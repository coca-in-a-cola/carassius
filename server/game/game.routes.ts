import { Router } from 'express';
import { gameController } from './game.controller';

export function setupGameRoutes(router: Router): void {
  router.post('/start', gameController.startNewGame);
  router.get('/player/:uuid', gameController.getPlayer);
  router.get('/status', gameController.getGameStatus);
}
