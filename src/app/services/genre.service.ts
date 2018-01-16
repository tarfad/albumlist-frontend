import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Genre} from "../model/Genre";

@Injectable()
export class GenreService {

  private apiUrl = 'http://localhost:8080/api/genres/';

  constructor(private http: Http) { }

  getGenres():  Promise<Genre[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json() as Genre[])
      .catch(this.handleError);
  }

  findById(id: number): Promise<Genre> {
    return this.http.get(this.apiUrl + id)
      .toPromise()
      .then(response => response.json() as Genre)
      .catch(this.handleError);
  }

  saveGenre(genreData: Genre): Promise<Genre> {
    return this.http.post(this.apiUrl, genreData)
      .toPromise().then(response => response.json() as Genre)
      .catch(this.handleError);
  }

  deleteGenre(id: number): Promise<any> {
    return this.http.delete(this.apiUrl + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateGenre(genreData: Genre): Promise<Genre> {
    console.log('updateGenre');
    return this.http.put(this.apiUrl + genreData.id, genreData)
      .toPromise()
      .then(response => response.json() as Genre)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
