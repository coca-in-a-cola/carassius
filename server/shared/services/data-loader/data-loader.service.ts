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
    const pathFromRoot = path.join(__dirname, '..', '..', '..', DATA_PATH);
    const cards = await this.parsePath<Card>(path.join(pathFromRoot, 'cards.csv'), Card);
    const effects = await this.parsePath<Effect>(path.join(pathFromRoot, 'effects.csv'), Effect);
    const requirements = await this.parsePath<Requirement>(path.join(pathFromRoot, 'requirements.csv'), Requirement);

    console.log(`Reading csv directory ${pathFromRoot}`);
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
