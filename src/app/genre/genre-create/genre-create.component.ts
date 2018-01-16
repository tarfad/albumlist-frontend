import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {Genre} from "../../model/Genre";
import {GenreService} from "../../services/genre.service";

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.css'],
  providers: [GenreService]
})
export class GenreCreateComponent implements OnInit {

  id: number;
  parentId: number;
  genre: Genre;

  genres: Genre[];

  genreForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private genreService: GenreService) {
  }

  ngOnInit() {
    console.info('genre-create-ngOnInit');

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.parentId = -1;

    this.genreForm = new FormGroup({
      name: new FormControl('', Validators.required),
      theParent: new FormControl('')
    });

    this.genreService.getGenres()
      .then(genres => this.genres = genres);

    if (this.id) { //edit form
      console.log('EDIT');
      this.genreService.findById(this.id).then(genre => {
        this.id = genre.id;
        let p = genre.parent;
        if(p != null) {
          this.parentId = p.id;
        }

        this.genreForm.patchValue({
          name: genre.name,
          theParent: this.parentId
        });
      });

      //this.genreForm.controls['theParent'].disable();
    }
    else {
      this.genreForm.patchValue({
        theParent: this.parentId
      });
    }
  }

  ngAfterContentInit(): void {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.genreForm.valid) {
      let parent =
        new Genre(this.genreForm.controls['theParent'].value, '', null);

      if (this.id) {
        let genreUpdate: Genre = new Genre(this.id,
          this.genreForm.controls['name'].value,
          parent);
        console.log(JSON.stringify(genreUpdate));
        let userPromise = this.genreService.updateGenre(genreUpdate);
      } else {
        let genreCreate: Genre = new Genre(null,
          this.genreForm.controls['name'].value,
          parent);
        let userPromise2 = this.genreService.saveGenre(genreCreate);

      }


    }
    this.genreForm.reset();
    this.router.navigate(['/genre']);
  }

  redirectGenrePage() {
    this.router.navigate(['/genre']);

  }
}
