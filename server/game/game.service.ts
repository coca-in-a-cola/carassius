import { Player } from '@server/core';
import { GameStartResponse } from './game.models';

export class GameService {
  /**
   * Начинает новую игру и создает игрока
   */
  public startNewGame(): GameStartResponse {
    try {
      // Создаем нового игрока
      const player = Player.create();

      // Сохраняем игрока в памяти приложения
      Player.players[player.uuid] = player;

      return {
        player,
        message: 'Новая игра успешно начата'
      };
    } catch (error) {
      throw new Error(`Ошибка при создании новой игры: ${error}`);
    }
  }

  /**
   * Получает игрока по UUID
   */
  public getPlayer(uuid: string): Player | null {
    const player = Player.findByUUID(uuid);
    if (!player) {
      return null;
    }

    return player;
  }

  /**
   * Получает количество активных игроков (для отладки)
   */
  public getActivePlayersCount(): number {
    return Object.keys(Player.players).length;
  }
}

export const gameService = new GameService();
