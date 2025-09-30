export interface Deserializable {
  deserialize?(object: any, index?: number): this;
}

export interface SerializableTo<T = any> {
  serialize?(): T;
}

export interface DeserializableNullish extends Deserializable {
  thisOrNull?(): this | null;
}

export interface Checkable {
  _checked?: boolean;
}
