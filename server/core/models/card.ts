import { arrayOf, DataClass, defaultValue, prop } from './data';

export class Card extends DataClass {
  @prop(Number) id!: number;
  @prop(String) text!: string;

  @arrayOf() @prop(Number) @defaultValue([]) requirements!: number[];
  @arrayOf() @prop(Number) @defaultValue([]) yesEffects!: number[];
  @arrayOf() @prop(Number) @defaultValue([]) noEffects!: number[];
}
