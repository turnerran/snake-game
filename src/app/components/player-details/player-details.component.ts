import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../models/player';
import { PlayerService } from 'src/app/services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
})
export class PlayerDetailsComponent implements OnInit {
  public player: Player = {
    id: 1,
    name: '',
    score: 0,
  };

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {}

  save(): void {
    this.playerService.setPlayer(this.player);
    this.router.navigate(['/play']);
  }
}