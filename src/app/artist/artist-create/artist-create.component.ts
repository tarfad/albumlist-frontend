import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArtistService} from "../artist.service";
import {Artist} from "../../model/Artist";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.css'],
  providers: [ArtistService]
})
export class ArtistCreateComponent implements OnInit, OnDestroy {

  id: number;
  artist: Artist;

  artistForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private artistService: ArtistService) { }

  ngOnInit() {
    console.info('artist-create-ngOnInit');

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.artistForm = new FormGroup({
      name: new FormControl('', Validators.required),
      spotifyLink: new FormControl('')
    });

    if (this.id) { //edit form
      console.log('EDIT');
      this.artistService.findById(this.id).
      then(artist => {
        this.id = artist.id;
        this.artistForm.patchValue({
          name: artist.name,
          spotifyLink: artist.spotifyLink
        });
      } );


    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.artistForm.valid) {
      if (this.id) {
        let user: Artist = new Artist(this.id,
          this.artistForm.controls['name'].value,
          this.artistForm.controls['spotifyLink'].value);
        let artistPromise = this.artistService.updateArtist(user);
      } else {
        let user: Artist = new Artist(null,
          this.artistForm.controls['name'].value,
          this.artistForm.controls['spotifyLink'].value);
        let artistPromise2 = this.artistService.saveArtist(user);

      }


    }
    this.artistForm.reset();
    this.router.navigate(['/artist']);
  }

  redirectUserPage() {
    this.router.navigate(['/artist']);

  }

}
