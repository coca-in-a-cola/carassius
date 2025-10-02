import Papa from 'papaparse';
import { Card, DataClass, Effect, Requirement, GameData } from '../../../core';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { DATA_PATH } from './data-loader.constants';

export class DataLoaderService {

  public parseNested<T extends DataClass>(input: any[], cls: typeof DataClass): T[] {
    const result: T[] = [];

    for (const element of input) {
      const data = { ...element };
      for (const key of Object.keys(element)) {
        if (typeof element[key] === 'string' && element[key].startsWith('[')) {
          data[key] = JSON.parse(element[key]);
        }
      }

      result.push(new cls(data) as T);
    }

    return result;
  }

  public async load(): Promise<GameData> {
    const cards = await this.parsePath<Card>(path.join(DATA_PATH, 'cards.csv'), Card);
    const effects = await this.parsePath<Effect>(path.join(DATA_PATH, 'effects.csv'), Effect);
    const requirements = await this.parsePath<Requirement>(path.join(DATA_PATH, 'requirements.csv'), Requirement);

    return { cards, effects, requirements };
  }

  public async parsePath<T extends DataClass>(destPath: string, as: typeof DataClass): Promise<T[]> {

    const file = createReadStream(destPath);

    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (value) => resolve(this.parseNested(value.data, as)),
        error: reject
      });
    });
  }
}

export const dataLoaderService = new DataLoaderService();
