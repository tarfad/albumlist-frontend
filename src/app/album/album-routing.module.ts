import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumCreateComponent } from './album-create/album-create.component';

const routes: Routes = [
  {path: 'album', component: AlbumListComponent},
  {path: 'album/create', component: AlbumCreateComponent},
  {path: 'album/edit/:id', component: AlbumCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
