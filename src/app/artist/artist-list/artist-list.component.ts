import { Component, OnInit } from '@angular/core';
import { Artist } from "../../model/Artist";
import { ArtistService } from "../artist.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers: [ArtistService]
})
export class ArtistListComponent implements OnInit {

  private artists: Artist[];

  constructor(
    private router: Router,
    private location: Location,
    private artistService: ArtistService) { }

  ngOnInit() { //when component loading get all artists and set the artists[]
    console.log('ngOnInit - Artist');
    this.getAllArtists();
  }

  getAllArtists(): void {
    console.log('getAllArtists');
    this.artistService.getArtists()
      .then(artists => this.artists = artists );
  }

  redirectNewArtistPage() {
    console.log('redirectNewArtistPage');
    this.router.navigate(['/artist/create']);
  }

  editArtistPage(artist: Artist) {
    console.log('editArtistPage');
    if (artist) {
      this.router.navigate(['/artist/edit', artist.id]);
    }
  }

  deleteArtist(artist: Artist) {
    console.log('Delete User: ' + artist.name);
    let promise = this.artistService.deleteArtist(artist.id);
    this.reloadPage();
    console.log('done');
  }

  reloadPage() {
    console.log('reloadPage');
    location.reload();
  }

}
