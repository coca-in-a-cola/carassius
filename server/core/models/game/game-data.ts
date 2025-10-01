import { Card } from '../card';
import { Effect } from '../effect';
import { Requirement } from '../requirement';

export interface GameData {
  cards: Card[];
  effects: Effect[];
  requirements: Requirement[];
}

