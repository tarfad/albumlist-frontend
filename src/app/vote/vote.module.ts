import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {VoteRoutingModule} from "./vote-routing.module";
import {VoteListComponent} from "./vote.component";

@NgModule({
  imports: [
    CommonModule,
    VoteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [VoteListComponent]
})
export class VoteModule { }
