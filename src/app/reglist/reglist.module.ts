import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglistRoutingModule } from './reglist-routing.module';
import { ReglistListComponent } from './reglist-list/reglist-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReglistRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ReglistListComponent]
})
export class ReglistModule { }
