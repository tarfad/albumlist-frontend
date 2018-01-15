import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreListComponent } from './genre-list/genre-list.component';
import { GenreCreateComponent } from './genre-create/genre-create.component';

@NgModule({
  imports: [
    CommonModule,
    GenreRoutingModule
  ],
  declarations: [GenreListComponent, GenreCreateComponent]
})
export class GenreModule { }
