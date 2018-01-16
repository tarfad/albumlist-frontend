import {Component, OnDestroy, OnInit, AfterContentInit} from '@angular/core';

import {AlbumService} from "../../services/album.service";
import {ArtistService} from "../../services/artist.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Album} from "../../model/Album";
import {Artist} from "../../model/Artist";
import {ActivatedRoute, Router} from "@angular/router";

import {ConfigService} from "../../config/config.service";
import {Genre} from "../../model/Genre";
import {GenreService} from "../../services/genre.service";


@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css'],
  providers: [ConfigService, AlbumService, ArtistService, GenreService]
})
export class AlbumCreateComponent implements OnInit, OnDestroy, AfterContentInit {

  id: number;
  album: Album;

  years: number[];

  artistId: number;
  artists: Artist[];

  genres: Genre[];

  albumForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private configService: ConfigService,
              private albumService: AlbumService,
              private artistService: ArtistService,
              private genreService: GenreService) { }

  ngOnInit() {
    console.info('album-create-ngOnInit');

    this.years = this.configService.getYears();

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.albumForm = new FormGroup({
      theYear: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      spotifyLink: new FormControl(''),
      theArtist: new FormControl('', Validators.required),
      theGenre: new FormControl('')
    });

    this.artistService.getArtists()
      .then(artists => this.artists = artists );


    this.genreService.getGenres()
      .then(genres => this.genres = genres );

    if (this.id) { //edit form
      console.log('EDIT');
      this.albumService.findById(this.id).
      then(album => {
        this.album = album;
        this.id = album.id;
        this.artistId = album.artist.id;

        let genreId: number = -1;
        if(album.genre != null) {
          genreId =  album.genre.id;
        }

        this.albumForm.patchValue({
          name: album.name,
          spotifyLink: album.spotifyLink,
          theArtist: album.artist.id,
          theYear: album.year,
          theGenre: genreId
        });
      }
      );
      this.albumForm.controls['theArtist'].setValue(this.artistId);
      this.albumForm.controls['theArtist'].disable();
    }
    else  {
      this.albumForm.patchValue({
        theGenre: -1
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  ngAfterContentInit(): void {
    console.info('album-create-ngAfterContentInit');
    if(this.id) {
      console.log('this.artistId: ' + this.artistId)
      this.albumForm.controls['theArtist'].setValue(this.artistId);
      this.albumForm.controls['theArtist'].disable();
    }
  }

  onSubmit() {
    if (this.albumForm.valid) {
      let artistBean: Artist =
        new Artist(this.albumForm.controls['theArtist'].value,
          '',
          '');

      let genre: Genre = new Genre(this.albumForm.controls['theGenre'].value,
        '', null);

      if (this.id) {
        let user: Album = new Album(this.id,
          this.albumForm.controls['name'].value,
          this.albumForm.controls['spotifyLink'].value,
          null,
          this.albumForm.controls['theYear'].value,
          genre);
        let albumPromise = this.albumService.updateAlbum(user);
      } else {
        let albumBean: Album = new Album(null,
          this.albumForm.controls['name'].value,
          this.albumForm.controls['spotifyLink'].value,
          artistBean,
          this.albumForm.controls['theYear'].value,
          genre
          );
        let albumPromise2 = this.albumService.saveAlbum(albumBean);
      }


    }
    this.albumForm.reset();
    this.router.navigate(['/album']);
  }

  redirectAlbumPage() {
    this.router.navigate(['/album']);

  }

}
