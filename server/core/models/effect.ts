import { DataClass, prop } from './data';

export class Effect extends DataClass {
  @prop(Number) id!: number | null;

  @prop(String) statId!: string;

  @prop(Number) statValue!: number | null;

  @prop(Number) money!: number | null;

  @prop(Number) delay!: number | null;
  @prop(Number) repeatCount!: number | null;
  @prop(Number) clearEffectId!: number | null;
}
