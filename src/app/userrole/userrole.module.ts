import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserroleRoutingModule } from './userrole-routing.module';
import { UserRoleListComponent } from './userrole-list/userrole-list.component';
import { UserroleCreateComponent } from './userrole-create/userrole-create.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    UserroleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UserRoleListComponent, UserroleCreateComponent]
})
export class UserroleModule {
  constructor() {
    console.log("UserroleModule - constructor")
  }

}
