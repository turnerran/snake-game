import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameContainerComponent } from './components/game-container/game-container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';

const routes: Routes = [
  { path: '', component: PlayerDetailsComponent },
  { path: 'details', component: PlayerDetailsComponent },
  { path: 'play', component: GameContainerComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
