import { Player } from './player';

declare module 'express' {
  export interface Request {
    player?: Player;
  }
}
