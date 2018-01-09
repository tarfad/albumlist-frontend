import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlbumListComponent} from "../album/album-list/album-list.component";
import {ReglistListComponent} from "./reglist-list/reglist-list.component";

const routes: Routes = [
  {path: 'reglist', component: ReglistListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReglistRoutingModule { }
