import { v7 as uuid } from 'uuid';
import { Stat } from './stat';
import { arrayOf, DataClass, defaultValue, prop } from './data';
import { PlayerCardRecord } from './card-record';

export class Player extends DataClass {
  static players: Record<string, Player> = {};

  static findByUUID(uid: string): Player | null {
    return this.players[uid];
  }

  static create() {
    return new Player();
  }

  @prop(String) @defaultValue(() => uuid())
  public uuid!: string;

  @prop(String) @defaultValue('Игрок')
  public displayName!: string;

  @arrayOf() @prop(Stat) @defaultValue(() => Stat.getDefault())
  public stats!: Stat[];

  @prop(Number) @defaultValue(100000)
  public money!: number;

  @prop(Number) @defaultValue(1)
  public day!: number;

  @prop(Number) @defaultValue(null)
  public selectedCardId!: number;

  @arrayOf() @prop(PlayerCardRecord) @defaultValue([])
  public history!: PlayerCardRecord[];
}
