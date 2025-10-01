import { DataClass, prop } from '../data';

export class PlayerActiveEffect extends DataClass {
  @prop(Number)
  effectId!: number;

  @prop(Number)
  appliedDay!: number;

  @prop(Number)
  repeatsLeft!: number;
}
