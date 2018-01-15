import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { YearlistRoutingModule } from './yearlist-routing.module';
import { YearlistListComponent } from './yearlist-list/yearlist-list.component';

@NgModule({
  imports: [
    CommonModule,
    YearlistRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [YearlistListComponent]
})
export class YearlistModule { }
