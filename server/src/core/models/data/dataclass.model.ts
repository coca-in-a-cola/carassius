import { DeserializableNullish, SerializableTo } from './interfaces.model';
import 'reflect-metadata';

const propKey = 'props';
const arrayKey = 'isArray';

type ConstructorType<T,K> = {
  new (value: K): T;
}

type FunctionType<T,K> = (inner: ConstructorType<T,K>) => ConstructorType<T,K>;
type InputType<T,K> = ConstructorType<T,K> | FunctionType<T,K>;

export function prop<T, K>(type: InputType<T, K>) {
  return function (target: any, propertyKey: string) {
    const existingMetadata = Reflect.getMetadata(propKey, target.constructor) || {};
    existingMetadata[propertyKey] = type;
    Reflect.defineMetadata(propKey, existingMetadata, target.constructor);
  };
}

export function arrayOf() {
  return function (target: any, propertyKey: string) {
    const existingMetadata = Reflect.getMetadata(arrayKey, target.constructor) || {};
    existingMetadata[propertyKey] = true;
    Reflect.defineMetadata(arrayKey, existingMetadata, target.constructor);
  };
}


export class DataClass implements DeserializableNullish, SerializableTo<object> {

  constructor(object: any) {
    if (object) {
      this.deserialize(object);
    }
  }

  static parseProp(props: any, key: string, input: any): any {
    const type = props[key] as ConstructorType<any, any>;
    const value = input[key];

    if (value !== undefined && value !== null) {
      if (type === DataClass || type instanceof DataClass) {
        return new type(value);
      }

      if (type === Array && Array.isArray(value) && type) {
        return [];
      }

      if (type === Date) {
        return new Date(value);
      }

      if (type === Number) {
        return Number(value);
      }

      if (type === String) {
        return value ? String(value) : null;
      }

      if (type === Boolean) {
        return Boolean(value);
      }

      if (value in type) {
        // Handle enum types
        return (type as any)[value];
      }

      return value;
    }
  }

  deserialize(input: any): this {
    const props = Reflect.getMetadata(propKey, this.constructor);
    const arrays = Reflect.getMetadata(arrayKey, this.constructor);

    if (!props) {
      return this;
    }

    for (const key in props) {
      const isArrayOf = Object.prototype.hasOwnProperty.call(arrays, key);
      const isProp = Object.prototype.hasOwnProperty.call(props, key);

      if (!isProp) {
        continue;
      }

      if (isArrayOf) {
        // TODO: возможно isArrayOf будет криво работать. Проверить.
        if (!Array.isArray(input)) {
          continue;
        }

        (this as any)[key] = input.map(val => DataClass.parseProp(props, key, val));
      }

      (this as any)[key] = DataClass.parseProp(props, key, input);
    }

    return this;
  }

  serialize(): object {
    return JSON.parse(JSON.stringify(this));
  }

  thisOrNull(): this | null {
    if (Object.keys(this).length === 0) {
      return null;
    }

    return this;
  }
}
