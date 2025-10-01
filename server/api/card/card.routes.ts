import { Router } from 'express';
import { ensurePlayer } from '../middleware';
import { cardController } from './card.controller';

export function setupCardRoutes(router: Router): void {
  router.get('/card/select/:category', ensurePlayer, cardController.selectCard);
  router.post('/card/yes', ensurePlayer, cardController.chooseYes);
  router.post('/card/no', ensurePlayer, cardController.chooseNo);
}
