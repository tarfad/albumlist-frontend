import { Injectable } from '@angular/core';
import { Album } from '../model/Album';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AlbumService {

  private apiUrl = 'http://localhost:8080/api/albums/';

  constructor(private http: Http) { }

  getAlbums():  Promise<Album[]> {
    console.log('AlbumService: getAlbums');
    console.log('Call: ' + this.apiUrl);
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json() as Album[])
      .catch(this.handleError);
  }

  findById(id: number): Promise<Album> {
    return this.http.get(this.apiUrl + id)
      .toPromise()
      .then(response => response.json() as Album)
      .catch(this.handleError);
  }

  getAlbumsByYear(year: number):  Promise<Album[]> {
    console.log('getAlbumsByYear: ' + year);

    console.log('Call: ' + this.apiUrl + "year/" + year);
    return this.http.get(this.apiUrl + "year/" + year)
      .toPromise()
      .then(response => response.json() as Album[])
      .catch(this.handleError);
  }

  searchAlbums(year: number, genreId: number, currentSearchString: string):  Promise<Album[]> {
    console.log('searchAlbums: ' + year);
    if(year == null) {
      year = -1;
    }
    if(genreId == null) {
      genreId = -1;
    }

    let param = {params: {'year': year, 'genreId': genreId,'searchString': currentSearchString}}
    console.log(param);
    return this.http.get(this.apiUrl + "search/",param )
      .toPromise()
      .then(response => response.json() as Album[])
      .catch(this.handleError);
  }

  saveAlbum(albumsData: Album): Promise<Album> {
    return this.http.post(this.apiUrl, albumsData)
      .toPromise().then(response => response.json() as Album)
      .catch(this.handleError);
  }

  deleteAlbum(id: number): Promise<any> {
    return this.http.delete(this.apiUrl + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateAlbum(albumsData: Album): Promise<Album> {
    console.log('updateAlbum');
    return this.http.put(this.apiUrl + albumsData.id, albumsData)
      .toPromise()
      .then(response => response.json() as Album)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
