import { Request, Response } from 'express';
import { gameService } from './game.service';
import { GameStartResponse } from './game.models';

export class GameController {
  public startNewGame = async (req: Request, res: Response): Promise<any> => {
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

  public getPlayer = async (req: Request, res: Response): Promise<any> => {
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

  public getGameStatus = async (req: Request, res: Response): Promise<any> => {
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
