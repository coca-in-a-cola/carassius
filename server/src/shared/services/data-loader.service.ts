import Papa from 'papaparse';
import { Card, Effect, Requirement } from '../../core';
import { createReadStream } from 'node:fs';

interface CardsRow {
  id: string;
  text: string;
  requirements: string;
  yesEffects: string;
  noEffects: string;
}

interface RequirementsRow {
  id: number;
  cardRequirements: string;
  statId: string;
  statValue: number;
  money: number;
  operator: string;
}

interface EffectsRow {
  id: number;
  statId: string;
  statValue: number;
  money: number;
  delay: number;
  repeatCount: number;
  clearEffectId: number;
}

export class DataLoaderService {
  private PATH = './data/csv'; // TODO: мб в .env засунуть

  public async parseCards(): Promise<Card[]> {
    const result: Card[] = [];

    const cardsPath = `${this.PATH}/cards.csv`;
    const file = createReadStream(cardsPath);
    return new Promise((resolve) => {
      Papa.parse<CardsRow>(file, {
        header: true,
        complete: (parseResult) => {
          parseResult.data.forEach((cardRow) => {
            result.push(new Card({
              id: +cardRow.id,
              text: cardRow.text,
              requirements: cardRow.requirements.split(',').map(s => s.trim()),
              yesEffects: cardRow.yesEffects.split(',').map(s => s.trim()),
              noEffects: cardRow.noEffects.split(',').map(s => s.trim()),
            }));
          });
          resolve(result);
        }
      });
    });
  }


  public async parseEffects(): Promise<Effect[]> {
    const result: Effect[] = [];

    const effectsPath = `${this.PATH}/effects.csv`;
    const file = createReadStream(effectsPath);
    return new Promise((resolve) => {
      Papa.parse<EffectsRow>(file, {
        header: true,
        complete: (parseResult) => {
          parseResult.data.forEach((effectsRow) => {
            result.push(new Effect({
              id: +effectsRow.id,
              statId: effectsRow.statId,
              statValue: +effectsRow.statValue,
              money: +effectsRow.money,
              delay: +effectsRow.delay,
              repeatCount: +effectsRow.repeatCount,
              clearEffectId: +effectsRow.clearEffectId,
            }));
          });
          resolve(result);
        }
      });
    });
  }


  public async parseRequirements(): Promise<Requirement[]> {
    const result: Requirement[] = [];

    const requirementsPath = `${this.PATH}/requirements.csv`;
    const file = createReadStream(requirementsPath);
    return new Promise((resolve) => {
      Papa.parse<RequirementsRow>(file, {
        header: true,
        complete: (parseResult) => {
          parseResult.data.forEach((requirementsRow) => {
            result.push(new Requirement({
              id: +requirementsRow.id,
              cardRequirements: requirementsRow.cardRequirements.split(',').map(s => s.trim()),
              statId: requirementsRow.statId,
              statValue: requirementsRow.statValue,
              money: +requirementsRow.money,
              operator: requirementsRow.operator,
            }));
          });
          resolve(result);
        }
      });
    });
  }
}

export const dataLoaderService = new DataLoaderService();
