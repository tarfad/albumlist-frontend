import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Album } from "../../model/Album";
import { Artist } from "../../model/Artist";
import { AlbumService } from "../../services/album.service";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
  providers: [AlbumService]
})
export class AlbumListComponent implements OnInit {

  private albums: Album[];

  constructor(
    private router: Router,
    private location: Location,
    private albumService: AlbumService) { }

  ngOnInit() {
    console.log('ngOnInit - Albums');
    this.getAllAlbums();
  }

  getAllAlbums(): void {
    console.log('getAllAlbums');
    this.albumService.getAlbums()
      .then(albums => this.albums = albums );
    console.log("X: " + this.albums);

  }

  redirectNewAlbumPage() {
    console.log('redirectNewAlbumPage');
    this.router.navigate(['/album/create']);
  }

  editAlbumPage(album: Album) {
    console.log('editAlbumPage');
    if (album) {
      this.router.navigate(['/album/edit', album.id]);
    }
  }

  deleteAlbum(album: Album) {
    console.log('Delete User: ' + album.name);
    let promise = this.albumService.deleteAlbum(album.id);
    this.reloadPage();
    console.log('done');
  }

  reloadPage() {
    console.log('reloadPage');
    location.reload();
  }

}
