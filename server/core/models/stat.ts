import { DataClass, prop } from './data';

export class Stat extends DataClass {

  @prop(String) id!: string;
  @prop(Number) value!: number;

  static getDefault(): Stat[] {
    return [new Stat({ id: 'health', value: 100 }), new Stat({ id: 'spirit', value: 100 })];
  }
}
