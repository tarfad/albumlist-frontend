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
import {GenreModule} from "./genre/genre.module";

import { CoreModule } from './core/core.module';
import {WelcomeModule} from "./welcome/welcome.module";
import {UserGroupModule} from "./usergroup/usergroup.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    UserGroupModule,
    ArtistModule,
    AlbumModule,
    ReglistModule,
    YearlistModule,
    GenreModule,
    WelcomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log("AppModule - constructor")
  }

}
