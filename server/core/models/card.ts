import { arrayOf, DataClass, defaultValue, prop } from './data';

export const enum CardCategory {
  WORK = 'work',
  FAMILY = 'family',
  MEDICINE = 'medicine',
  EDUCATION = 'education',
  HOBBY = 'hobby',
  FINANCIALS = 'financials'
}

export class Card extends DataClass {
  @prop(Number) id!: number;
  @prop(String) text!: string;
  @prop(String) @defaultValue(CardCategory.WORK) category!: CardCategory;

  @arrayOf() @prop(Number) @defaultValue([]) requirements!: number[];
  @arrayOf() @prop(Number) @defaultValue([]) yesEffects!: number[];
  @arrayOf() @prop(Number) @defaultValue([]) noEffects!: number[];
}
