import { Injectable, ɵPlayer } from '@angular/core';
import { Player } from '../models/player';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentPlayer: Player;

  constructor(private firestore: AngularFirestore) {}

  setPlayer(player: Player) {
    this.currentPlayer = player;
  }

  GetPlayers() {
    return this.firestore
      .collection('players', (player) =>
        player.orderBy('score', 'desc').limit(10)
      )
      .snapshotChanges();
  }

  createPlayer(player: Player) {
    const id = this.firestore.createId();
    player.id = id;
    this.firestore
      .collection('players')
      .add(player)
      .then((res) => {})
      .catch((err) => console.log(err));
  }

  update(player: Player) {
    const ref = this.firestore.collection('players').doc(player.id);

    ref.set({ name: player.name, score: player.score });
  }
}
