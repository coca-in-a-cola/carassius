import { DataClass, prop } from './data';

export class PlayerCardRecord extends DataClass {
  @prop(Number) cardId = null;
  @prop(Boolean) approved = false;
}
