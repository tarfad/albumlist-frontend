import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { ReglistModule } from './reglist/reglist.module';
import { YearlistModule } from './yearlist/yearlist.module';

import { HttpModule }    from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    ReglistModule,
    YearlistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
