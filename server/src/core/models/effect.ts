import { DataClass, prop } from './data';

export class Effect extends DataClass {
  @prop(Number) id: number | null = null;

  @prop(String) statId = '';
  @prop(Number) statValue: number | null = null;
  @prop(Number) money: number | null = null;
  @prop(Number) delay: number | null = null;
  @prop(Number) repeatCount: number | null = null;
  @prop(Number) clearEffectId: number | null = null;

  static effects: Record<number, Effect> = { };

  static findById(id: number): Effect | null {
    return this.effects[id] ?? null;
  }
}
