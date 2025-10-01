import { Request, Response } from 'express';
import { gameService } from './game.service';
import { GameStartResponse } from './game.models';

export class GameController {
  /**
   * POST /api/game/start
   * Начинает новую игру
   */
  public startNewGame = async (req: Request, res: Response): Promise<void> => {
    try {
      const result: GameStartResponse = gameService.startNewGame();

      res.status(201).json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Ошибка при старте игры:', error);
      res.status(500).json({
        success: false,
        error: 'Не удалось начать новую игру',
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  };

  /**
   * GET /api/game/player/:uuid
   * Получает данные игрока по UUID
   */
  public getPlayer = async (req: Request, res: Response): Promise<void> => {
    try {
      const { uuid } = req.params;

      if (!uuid) {
        res.status(400).json({
          success: false,
          error: 'UUID игрока обязателен'
        });
        return;
      }

      const player = gameService.getPlayer(uuid);

      if (!player) {
        res.status(404).json({
          success: false,
          error: 'Игрок не найден'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: { player },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Ошибка при получении игрока:', error);
      res.status(500).json({
        success: false,
        error: 'Не удалось получить данные игрока',
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  };

  /**
   * GET /api/game/status
   * Получает статус игры (для отладки)
   */
  public getGameStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const activePlayers = gameService.getActivePlayersCount();

      res.status(200).json({
        success: true,
        data: {
          activePlayers,
          message: `Активных игроков: ${activePlayers}`
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Ошибка при получении статуса:', error);
      res.status(500).json({
        success: false,
        error: 'Не удалось получить статус игры'
      });
    }
  };
}

export const gameController = new GameController();
