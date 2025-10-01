import { Player, Card, CardCategory, PlayerCardRecord } from '@server/core/models';

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

    const randomIndex = Math.floor(Math.random() * categoryCards.length);
    const selectedCard = categoryCards[randomIndex];

    player.selectedCard = selectedCard;

    return player;
  }

  public applyChoice(player: Player, approved: boolean): Player {
    if (!player.selectedCard) {
      throw new Error('No card selected');
    }

    // TODO: Применить эффекты
    // const effects = cardSystem.getCardEffects(player.selectedCardId, choice);
    // effectSystem.applyEffects(player, effects);

    player.history.push(new PlayerCardRecord({
      cardId: player.selectedCard.id,
      approved,
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

  public checkCardRequirements(cardId: number, player: Player): boolean {
    const card = this.getCardById(cardId);
    return !card || card.requirements.length === 0;
  }

  public getAvailableCardsForPlayer(category: CardCategory, player: Player): Card[] {
    const categoryCards = this.getCardsByCategory(category);
    return categoryCards.filter(card => this.checkCardRequirements(card.id, player));
  }
}

export const cardSystem = new CardSystem();
