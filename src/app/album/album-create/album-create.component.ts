import {Component, OnDestroy, OnInit, AfterContentInit} from '@angular/core';

import {AlbumService} from "../../services/album.service";
import {ArtistService} from "../../services/artist.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Album} from "../../model/Album";
import {Artist} from "../../model/Artist";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css'],
  providers: [AlbumService, ArtistService]
})
export class AlbumCreateComponent implements OnInit, OnDestroy, AfterContentInit {

  id: number;
  album: Album;

  artistId: number;
  artists: Artist[];

  albumForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private albumService: AlbumService,
              private artistService: ArtistService) { }

  ngOnInit() {
    console.info('album-create-ngOnInit');

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.albumForm = new FormGroup({
      name: new FormControl('', Validators.required),
      spotifyLink: new FormControl(''),
      theArtist: new FormControl('')
    });

    this.artistService.getArtists()
      .then(artists => this.artists = artists );


    if (this.id) { //edit form
      console.log('EDIT');
      this.albumService.findById(this.id).
      then(album => {
        this.album = album;
        this.id = album.id;
        this.artistId = album.artist.id;
        console.log('this.artistId in find: ' + this.artistId)
        this.albumForm.patchValue({
          name: album.name,
          spotifyLink: album.spotifyLink,
          theArtist: album.artist.id
        });
      }
      );
      this.albumForm.controls['theArtist'].setValue(this.artistId);
      this.albumForm.controls['theArtist'].disable();
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
      if (this.id) {
        let artistBean: Artist =
          new Artist(this.albumForm.controls['theArtist'].value,
            '',
            '');
        let user: Album = new Album(this.id,
          this.albumForm.controls['name'].value,
          this.albumForm.controls['spotifyLink'].value, null);
        let albumPromise = this.albumService.updateAlbum(user);
      } else {
        let artistBean: Artist =
          new Artist(this.albumForm.controls['theArtist'].value,
            '',
            '');
        let albumBean: Album = new Album(null,
          this.albumForm.controls['name'].value,
          this.albumForm.controls['spotifyLink'].value,
          artistBean);
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
