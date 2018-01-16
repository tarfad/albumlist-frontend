import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserGroupListComponent} from "./usergroup-list/usergroup-list.component";
import {UserGroupCreateComponent} from "./usergroup-create/usergroup-create.component";

const routes: Routes = [
  {path: 'usergroup', component: UserGroupListComponent},
  {path: 'usergroup/create', component: UserGroupCreateComponent},
  {path: 'usergroup/edit/:id', component: UserGroupCreateComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupRoutingModule { }
