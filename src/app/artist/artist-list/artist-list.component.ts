import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Artist } from "../../model/Artist";
import { ArtistService } from "../../services/artist.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers: [ArtistService]
})
export class ArtistListComponent implements OnInit {

  private artists: Artist[];
  private currentSearchString: string;

  searchForm: FormGroup;

  constructor(
    private router: Router,
    private location: Location,
    private artistService: ArtistService) { }

  ngOnInit() { //when component loading get all artists and set the artists[]
    console.log('ngOnInit - Artist');

    this.currentSearchString  = '';

    this.getAllArtists();

    this.searchForm = new FormGroup({
      artistSearch: new FormControl('')
    });
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
    console.log('Delete Artist: ' + artist.name);
    let promise = this.artistService.deleteArtist(artist.id);
    this.reloadPage();
    console.log('done');
  }

  onSubmit() {
    this.currentSearchString = this.searchForm.controls['artistSearch'].value;
    this.searchArtists();
  }

  searchArtists(): void {
    console.log('searchArtists');
    this.artistService.searchAtists(this.currentSearchString)
      .then(artists => this. artists = artists );

  }

  reloadPage() {
    console.log('reloadPage');
    location.reload();
  }

}
