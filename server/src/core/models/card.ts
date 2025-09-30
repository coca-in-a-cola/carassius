import { arrayOf, DataClass, prop } from './data';

export class Card extends DataClass {
  @prop(Number) id: number | null = null;

  @prop(String) text = '';
  @arrayOf() @prop(Number) requirements = [];
  @arrayOf() @prop(Number) yesEffects = [];
  @arrayOf() @prop(Number) noEffects = [];

  static cards: Record<number, Card> = { };

  static findById(id: number): Card | null {
    return this.cards[id] ?? null;
  }
}
