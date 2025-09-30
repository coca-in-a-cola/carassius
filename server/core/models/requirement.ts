import { arrayOf, DataClass, defaultValue, prop } from './data';

export class Requirement extends DataClass {
  @prop(Number) @defaultValue(null)
  id!: number | null;

  @prop(String) @defaultValue(null)
  statId!: string;

  @arrayOf() @prop(Number) @defaultValue([])
  cardRequirement!: number[];

  @prop(Number) @defaultValue(null)
  money!: number | null;

  @prop(Number) @defaultValue(null)
  statValue!: number | null;

  @prop(String) @defaultValue('>')
  operator!: '>' | '<';
}
