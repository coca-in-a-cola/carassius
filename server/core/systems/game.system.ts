import { Player, GameData, CardCategory } from '@server/core/models';
import { cardSystem } from './cards.system';
import { effectSystem } from './effects.system';
import { requirementSystem } from './requirements.system';

class GameSystem {
  private players: Map<string, Player> = new Map();

  public initialize(gameData: GameData): void {
    cardSystem.initialize(gameData.cards);
    effectSystem.initialize(gameData.effects);
    requirementSystem.initialize(gameData.requirements);

    // Test player
    this.registerPlayer(new Player({
      uuid: '0199a11b-c074-719c-9aed-e6abdf7b1483'
    }));
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

  public select(player: Player, category: CardCategory) {
    return cardSystem.select(player, category);
  }

  public apply(player: Player, approved: boolean): Player {
    const effectIds = approved ?
      player.selectedCard!.yesEffects :
      player.selectedCard!.noEffects;

    player = cardSystem.applyChoice(player, approved);
    player = effectSystem.applyEffects(player, effectIds);
    player = this.nextDay(player);
    return player;
  }

  public nextDay(player: Player): Player {
    player.day++;
    effectSystem.processDayEffects(player);
    return player;
  }

  public clear(): void {
    this.players.clear();
  }
}

export const gameSystem = new GameSystem();
