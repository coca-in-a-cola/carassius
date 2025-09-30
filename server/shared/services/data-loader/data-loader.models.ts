import { Card, Effect, Requirement } from '@server/core';

export interface GameData {
  cards: Card[];
  effects: Effect[];
  requirements: Requirement[];
}

