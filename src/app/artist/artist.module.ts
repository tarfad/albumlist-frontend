import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistCreateComponent } from './artist-create/artist-create.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ArtistRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ArtistListComponent, ArtistCreateComponent]
})
export class ArtistModule { }
