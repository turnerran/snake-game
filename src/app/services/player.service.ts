import { Injectable, ɵPlayer } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentPlayer: Player;

  setPlayer(player: Player) {
    this.currentPlayer = player;
  }
}
