import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Album } from "../../model/Album";
import { AlbumService } from "../../services/album.service";
import {ConfigService} from "../../config/config.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
  providers: [ConfigService, AlbumService]
})
export class AlbumListComponent implements OnInit {

  currentYear: number;
  currentSearchString: string;

  private albums: Album[];
  private years: number[];

  searchForm: FormGroup;

  constructor(
    private router: Router,
    private location: Location,
    private configService: ConfigService,
    private albumService: AlbumService) { }

  ngOnInit() {
    console.log('ngOnInit - Albums');

    this.currentYear = -1;
    this.currentSearchString = '';


    this.years = this.configService.getYears();
    this.getAllAlbums();

    this.searchForm = new FormGroup({
      theYear: new FormControl(''),
      artistSearch: new FormControl('')
    });

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
    console.log('Delete Album: ' + album.name);
    let promise = this.albumService.deleteAlbum(album.id);
    this.reloadPage();
    console.log('done');
  }

  doTriggerYear(newYear) {
    console.log('doTriggerYear: ' + newYear);
    this.currentYear = newYear;
    this.searchAlbums();
  }

  onSubmit() {
    this.currentSearchString = this.searchForm.controls['artistSearch'].value;
    this.searchAlbums();
  }

  searchAlbums(): void {
    console.log('searchAlbums');
    this.albumService.searchAlbums(this.currentYear, this.currentSearchString)
      .then(albums => this.albums = albums );

  }

  reloadPage() {
    console.log('reloadPage');
    location.reload();
  }

}
