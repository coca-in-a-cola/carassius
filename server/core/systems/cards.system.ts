import { Player, Card, CardCategory, PlayerCardRecord } from '../../core/models';
import { requirementSystem } from './requirements.system';

class CardSystem {
  private cards: Map<number, Card> = new Map();
  private cardsByCategory: Map<CardCategory, Card[]> = new Map();

  public initialize(cards: Card[]): void {
    this.cards.clear();
    this.cardsByCategory.clear();

    cards.forEach(card => {
      this.cards.set(card.id, card);

      if (!this.cardsByCategory.has(card.category)) {
        this.cardsByCategory.set(card.category, []);
      }
      this.cardsByCategory.get(card.category)!.push(card);
    });
  }

  public select(player: Player, category: CardCategory): Player {
    const categoryCards = this.cardsByCategory.get(category);

    if (!categoryCards || categoryCards.length === 0) {
      throw new Error(`Нет доступных карт в категории: ${category}`);
    }

    if (player.selectedCard) {
      throw new Error('Сначала ответьте на текущую карту');
    }

    // Фильтруем карты по требованиям
    const availableCards = categoryCards.filter(card =>
      this.checkCardRequirements(player, card)
    );

    if (availableCards.length === 0) {
      throw new Error(`Нет доступных карт в категории ${category} для игрока`);
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];

    player.selectedCard = selectedCard;
    return player;
  }

  public applyChoice(player: Player, approved: boolean): Player {
    if (!player.selectedCard) {
      throw new Error('No card selected');
    }

    player.history.push(new PlayerCardRecord({
      cardId: player.selectedCard.id,
      approved: !!approved,
      day: player.day,
      timestamp: new Date()
    }));
    player.selectedCard = null;

    return player;
  }

  public getCardById(cardId: number): Card | null {
    return this.cards.get(cardId) || null;
  }

  public getCardsByCategory(category: CardCategory): Card[] {
    return this.cardsByCategory.get(category) || [];
  }

  public getAvailableCategories(): CardCategory[] {
    return Array.from(this.cardsByCategory.keys());
  }

  public getTotalCardsCount(): number {
    return this.cards.size;
  }

  public checkCardRequirements(player: Player, card: Card): boolean {
    return requirementSystem.checkRequirements(player, card.requirements);
  }

  public getAvailableCardsForPlayer(category: CardCategory, player: Player): Card[] {
    const categoryCards = this.getCardsByCategory(category);
    return categoryCards.filter(card => this.checkCardRequirements(player, card));
  }

  public getFailedRequirementsForCard(player: Player, cardId: number): number[] {
    const card = this.getCardById(cardId);
    return card ? requirementSystem.getFailedRequirements(player, card.requirements) : [];
  }
}

export const cardSystem = new CardSystem();
