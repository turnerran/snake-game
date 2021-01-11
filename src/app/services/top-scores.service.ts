import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class TopScoresService {
  public Players: Player[] = [
    { id: 11, name: 'Dr Nice', score: 55 },
    { id: 12, name: 'Narco', score: 33 },
    { id: 13, name: 'Bombasto', score: 44 },
    { id: 14, name: 'Celeritas', score: 60 },
    { id: 15, name: 'Magneta', score: 60 },
    { id: 16, name: 'RubberMan', score: 70 },
    { id: 17, name: 'Dynama', score: 20 },
    { id: 18, name: 'Dr IQ', score: 30 },
    { id: 19, name: 'Magma', score: 80 },
    { id: 20, name: 'Tornado', score: 90 },
  ];
  constructor() {}

  GetTopPlayers() {
    return this.Players.sort((x, y) => y.score - x.score);
  }
}
