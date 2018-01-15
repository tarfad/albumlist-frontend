import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserRoleListComponent} from "./userrole-list/userrole-list.component";
import {UserroleCreateComponent} from "./userrole-create/userrole-create.component";

const routes: Routes = [
  {path: 'userrole', component: UserRoleListComponent},
  {path: 'userrole/create', component: UserroleCreateComponent},
  {path: 'userrole/edit/:id', component: UserroleCreateComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserroleRoutingModule { }
