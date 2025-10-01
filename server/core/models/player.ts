import { v7 as uuid } from 'uuid';
import { Stat } from './stat';
import { arrayOf, DataClass, defaultValue, prop } from './data';
import { PlayerCardRecord } from './card-record';
import { Card } from './card';
import { PlayerActiveEffect } from './effect/player-active-effect';

export class Player extends DataClass {
  static players: Record<string, Player> = {};

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

  @prop(Card) @defaultValue(null)
  public selectedCard!: Card | null;

  @arrayOf() @prop(PlayerCardRecord) @defaultValue([])
  public history!: PlayerCardRecord[];

  @arrayOf() @prop(PlayerActiveEffect) @defaultValue([])
  public activeEffects!: PlayerActiveEffect[];
}
