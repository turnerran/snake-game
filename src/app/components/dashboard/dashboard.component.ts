import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private playerService: PlayerService) {}
  players: Player[];
  displayedColumns: string[] = ['index', 'name', 'score'];
  isLoading = true;

  ngOnInit(): void {
    this.playerService.GetPlayers().subscribe((data) => {
      this.players = data.map((e) => {
        return {
          ...(e.payload.doc.data() as Player),
        };
      });
      this.isLoading = false;
    });
  }
}
