import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Genre} from "../model/Genre";
import {EnvironmentSpecificService} from "../core/services/environment-specific.service";

@Injectable()
export class GenreService {

  private mainApiUrl: string;
  private specifiedApiUrl = 'genres/';

  constructor(private http: Http,
              private envSpecificSvc: EnvironmentSpecificService) {
    this.mainApiUrl = envSpecificSvc.envSpecific.mainApiUrl;
  }

  getApiUrl(): string {
    return this.mainApiUrl + this.specifiedApiUrl;
  }

  getGenres():  Promise<Genre[]> {
    return this.http.get(this.getApiUrl())
      .toPromise()
      .then(response => response.json() as Genre[])
      .catch(this.handleError);
  }

  findById(id: number): Promise<Genre> {
    return this.http.get(this.getApiUrl() + id)
      .toPromise()
      .then(response => response.json() as Genre)
      .catch(this.handleError);
  }

  saveGenre(genreData: Genre): Promise<Genre> {
    return this.http.post(this.getApiUrl(), genreData)
      .toPromise().then(response => response.json() as Genre)
      .catch(this.handleError);
  }

  deleteGenre(id: number): Promise<any> {
    return this.http.delete(this.getApiUrl() + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateGenre(genreData: Genre): Promise<Genre> {
    return this.http.put(this.getApiUrl() + genreData.id, genreData)
      .toPromise()
      .then(response => response.json() as Genre)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
