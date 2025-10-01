import { Player, GameData, CardCategory } from '@server/core/models';
import { cardSystem } from './cards.system';

class GameSystem {
  private players: Map<string, Player> = new Map();

  public initialize(gameData: GameData): void {
    cardSystem.initialize(gameData.cards);
    console.log(`GameSystem инициализирован с ${gameData.cards.length} картами`);
  }

  public registerPlayer(player: Player): void {
    this.players.set(player.uuid, player);
  }

  public unregisterPlayer(playerUuid: string): boolean {
    return this.players.delete(playerUuid);
  }

  public getPlayer(playerUuid: string): Player | null {
    return this.players.get(playerUuid) || null;
  }

  public getSystemStats() {
    return {
      totalPlayers: this.players.size,
      totalCards: cardSystem.getTotalCardsCount(),
      availableCategories: cardSystem.getAvailableCategories()
    };
  }

  public selectCardForPlayer(category: CardCategory, playerUuid: string) {
    const player = this.getPlayer(playerUuid);
    if (!player) {
      return {
        card: null,
        error: 'Игрок не найден'
      };
    }

    const availableCards = cardSystem.getAvailableCardsForPlayer(category, player);

    if (availableCards.length === 0) {
      return {
        card: null,
        error: `Нет доступных карт в категории ${category} для игрока`
      };
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];

    return {
      card: selectedCard,
      availableOptions: availableCards.length
    };
  }

  public clear(): void {
    this.players.clear();
  }
}

export const gameSystem = new GameSystem();
