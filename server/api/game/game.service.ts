import { Player } from '@server/core';
import { GameStartResponse } from './game.models';
import { gameSystem } from '@server/core/systems/game.system';

export class GameService {
  public startNewGame(): GameStartResponse {
    try {
      // Создаем нового игрока
      const player = Player.create();
      gameSystem.registerPlayer(player);

      return {
        player,
        message: 'Новая игра успешно начата'
      };
    } catch (error) {
      throw new Error(`Ошибка при создании новой игры: ${error}`);
    }
  }

  public getPlayer(uuid: string): Player | null {
    const player = gameSystem.getPlayer(uuid);
    if (!player) {
      return null;
    }

    return player;
  }

  public getActivePlayersCount(): number {
    return gameSystem.getSystemStats().totalPlayers;
  }
}

export const gameService = new GameService();
