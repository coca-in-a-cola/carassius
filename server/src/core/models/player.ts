import { v7 as uuid } from 'uuid';
import { Stat } from './stat';
import { arrayOf, prop } from './data';
import { PlayerCardRecord } from './card-record';

export class Player {
  static players: Record<string, Player> = { };

  static findByUUID(uid: string): Player | null {
    return this.players[uid];
  }

  static create() {
    return new Player();
  }

  @prop(String) uuid = uuid();
  @prop(String) displayName = 'Игрок';
  @arrayOf() @prop(Stat) stats = Stat.getDefault();
  @prop(Number) money = 100000;
  @prop(Number) day = 1;
  @prop(Number) selectedCardId = null;
  @arrayOf() @prop(PlayerCardRecord) history = [];
}
