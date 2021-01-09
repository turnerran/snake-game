import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameContainerComponent } from './game-container/game-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{path: 'play', component: GameContainerComponent}, {path: 'dashboard', component: DashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
