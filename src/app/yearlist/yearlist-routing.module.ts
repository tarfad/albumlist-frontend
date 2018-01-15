import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {YearlistListComponent} from "./yearlist-list/yearlist-list.component";
import {UserCreateComponent} from "../user/user-create/user-create.component";
import {UserListComponent} from "../user/user-list/user-list.component";

const routes: Routes = [
  {path: 'yearlist', component: YearlistListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YearlistRoutingModule { }
