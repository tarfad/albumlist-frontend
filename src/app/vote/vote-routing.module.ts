import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VoteListComponent} from "./vote.component";

const routes: Routes = [
  {path: 'vote', component: VoteListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoteRoutingModule { }
