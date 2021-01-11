import { Component, OnInit } from '@angular/core';
import { TopScoresService } from '../../services/top-scores.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private topScoresService: TopScoresService) {}
  players: Player[];
  ngOnInit(): void {
    this.players = this.topScoresService.GetTopPlayers();
  }
}
