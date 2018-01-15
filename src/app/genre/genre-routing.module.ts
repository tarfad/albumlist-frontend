import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GenreListComponent} from "./genre-list/genre-list.component";
import {GenreCreateComponent} from "./genre-create/genre-create.component";

const routes: Routes = [
  {path: 'genre', component: GenreListComponent},
  {path: 'genre/create', component: GenreCreateComponent},
  {path: 'genre/edit/:id', component: GenreCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
