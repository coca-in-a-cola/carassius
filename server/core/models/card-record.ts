import { DataClass, prop } from './data';

export class PlayerCardRecord extends DataClass {
  @prop(Number) cardId!: number;
  @prop(Boolean) approved!: boolean;
}
