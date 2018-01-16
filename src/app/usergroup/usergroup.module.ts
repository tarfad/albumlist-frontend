import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserGroupRoutingModule} from "./usergroup-routing.module";
import {UserGroupListComponent} from "./usergroup-list/usergroup-list.component";
import {UserGroupCreateComponent} from "./usergroup-create/usergroup-create.component";

@NgModule({
  imports: [
    CommonModule,
    UserGroupRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UserGroupListComponent, UserGroupCreateComponent]
})
export class UserGroupModule {
  constructor() {
    console.trace("UserGroupModule - constructor")
  }

}
