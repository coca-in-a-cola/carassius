import { arrayOf, DataClass, prop } from './data';

export class Requirement extends DataClass {
  @prop(Number) id: number | null = null;

  @prop(String) statId = '';
  @arrayOf() @prop(Number) cardRequirement: number[] = [];
  @prop(Number) money: number | null = null;
  @prop(Number) statValue: number | null = null;
  @prop(String) operator: '>' | '<' = '>';

  static requirements: Record<number, Requirement> = { };

  static findById(id: number): Requirement | null {
    return this.requirements[id] ?? null;
  }
}
