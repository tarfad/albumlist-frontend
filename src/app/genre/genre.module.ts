import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreListComponent } from './genre-list/genre-list.component';
import { GenreCreateComponent } from './genre-create/genre-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    GenreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [GenreListComponent, GenreCreateComponent]
})
export class GenreModule { }
