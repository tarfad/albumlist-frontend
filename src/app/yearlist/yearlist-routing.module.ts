import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {YearlistListComponent} from "./yearlist-list/yearlist-list.component";

const routes: Routes = [
  {path: 'yearlist', component: YearlistListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YearlistRoutingModule { }
