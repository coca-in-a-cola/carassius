import { DeserializableNullish, SerializableTo } from './interfaces.model';
import 'reflect-metadata';

const propSymbol = Symbol('props');
const arraySymbol = Symbol('isArray');
const defaultValueSymbol = Symbol('defaultValue');

type ConstructorType<T, K> = {
  new(value: K): T;
}

type FunctionType<T, K> = (inner: ConstructorType<T, K>) => ConstructorType<T, K>;
type InputType<T, K> = ConstructorType<T, K> | FunctionType<T, K>;

export function prop<T, K>(type: InputType<T, K>) {
  return function (target: any, propertyKey: string) {
    const existingMetadata = Reflect.getMetadata(propSymbol, target.constructor) || {};
    existingMetadata[propertyKey] = type;
    Reflect.defineMetadata(propSymbol, existingMetadata, target.constructor);
  };
}

export function defaultValue<T>(fnOrValue: T | (() => T)) {
  return function (target: any, propertyKey: string) {
    const existingMetadata = Reflect.getMetadata(defaultValueSymbol, target.constructor) || {};
    existingMetadata[propertyKey] = fnOrValue;
    Reflect.defineMetadata(defaultValueSymbol, existingMetadata, target.constructor);
  };
}

export function arrayOf() {
  return function (target: any, propertyKey: string) {
    const existingMetadata = Reflect.getMetadata(arraySymbol, target.constructor) || {};
    existingMetadata[propertyKey] = true;
    Reflect.defineMetadata(arraySymbol, existingMetadata, target.constructor);
  };
}


export class DataClass implements DeserializableNullish, SerializableTo<object> {

  constructor(object: any = {}) {
    if (object) {
      this.deserialize(object);
    }
  }

  static parseProp(props: any, key: string, value: any): any {
    const type = props[key] as ConstructorType<any, any>;

    if (value === undefined || value === null) {
      return null;
    }

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

  deserialize(input: any): this {
    const props = Reflect.getMetadata(propSymbol, this.constructor);
    const arrays = Reflect.getMetadata(arraySymbol, this.constructor);
    const defaults = Reflect.getMetadata(defaultValueSymbol, this.constructor);

    const result: any = {};

    if (!props) {
      return this;
    }

    for (const key in props) {
      const isArrayOf = arrays && Object.prototype.hasOwnProperty.call(arrays, key);
      const isProp = Object.prototype.hasOwnProperty.call(props, key);

      if (!isProp) {
        continue;
      }

      if (defaults?.[key]) {
        if (typeof defaults[key] === 'function') {
          result[key] = defaults[key]();
        } else {
          result[key] = defaults[key];
        }
      }

      if (isArrayOf) {
        // TODO: возможно isArrayOf будет криво работать. Проверить.
        if (!Array.isArray(input[key])) {
          continue;
        }

        result[key] = input[key].map(val => DataClass.parseProp(props, key, val));
        continue;
      }

      result[key] = DataClass.parseProp(props, key, input[key]);
    }

    Object.assign(this, result);

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
