import { Router } from 'express';
import { setupGameRoutes } from './game/game.routes';
import { setupCardRoutes } from './card/card.routes';

export function setApiRoutes(router: Router) {
  setupGameRoutes(router);
  setupCardRoutes(router);
}
