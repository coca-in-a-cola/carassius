import { Request, Response, NextFunction } from 'express';
import { gameSystem } from '@server/core/systems';

export function ensurePlayer(req: Request, res: Response, next: NextFunction): void {
  const playerUuid = req.header('X-Player-UUID');

  if (!playerUuid) {
    res.status(401).json({
      success: false,
      error: 'X-Player-UUID header is required'
    });
    return;
  }

  const player = gameSystem.getPlayer(playerUuid);
  if (!player) {
    next(new Error('player not found'));
    return;
  }

  req.player = player;
  next();
}
