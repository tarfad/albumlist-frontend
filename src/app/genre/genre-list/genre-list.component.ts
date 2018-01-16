import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {Genre} from "../../model/Genre";
import {GenreService} from "../../services/genre.service";

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css'],
  providers: [GenreService]
})
export class GenreListComponent implements OnInit {

  genres: Genre[];

  constructor(private router: Router,
              private location: Location,
              private genreService: GenreService) { }

  ngOnInit() {
    console.log('ngOnInit - Genre');
    this.getAllGenre();
  }

  getAllGenre(): void {
    console.log('getAllGenre');
    this.genreService.getGenres()
      .then(genres => this.genres = genres );
  }

  redirectNewGenrePage() {
    console.log('redirectNewGenrePage');
    this.router.navigate(['/genre/create']);
  }

  editGenrePage(genre: Genre) {
    console.log('editGenrePage');
    if (genre) {
      this.router.navigate(['/genre/edit', genre.id]);
    }
  }

  deleteUserRole(genre: Genre) {
    console.log('Delete Genre: ' + genre.name);
    let promise = this.genreService.deleteGenre(genre.id);
    this.reloadPage();
    console.log('done');
  }

  reloadPage() {
    console.log('reloadPage');
    location.reload();
  }

}
