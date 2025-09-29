import { DataClass, prop } from './data/dataclass.model';

export class PlayerCardRecord extends DataClass {
  @prop(Number) cardId = null;
  @prop(Boolean) approved = false;
}
