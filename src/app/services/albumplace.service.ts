import {Component, Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AlbumPlace} from "../model/AlbumPlace";
import {AlbumPlaceBean} from "../beans/AlbumPlaceBean";

@Injectable()
export class AlbumPlaceService {

  private apiUrl = 'http://localhost:8080/api/albumplace/';

  constructor(private http: Http) { }

  getAlbumsByYearAndUser(year: number, userId: number):  Promise<AlbumPlace[]> {
    console.log('AlbumService: getAlbumsByYearAndUser');
    return this.http.get(this.apiUrl + "year/", {params: {'year': year, 'id': userId}})
      .toPromise()
      .then(response => response.json() as AlbumPlace[])
      .catch(this.handleError);
  }

  /*
  saveAlbumPlace(albumsData: AlbumPlace): Promise<AlbumPlace> {
    return this.http.post(this.apiUrl, albumsData)
      .toPromise().then(response => response.json() as AlbumPlace)
      .catch(this.handleError);
  }

  deleteAlbumPlace(id: number): Promise<any> {
    return this.http.delete(this.apiUrl + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateAlbumPlace(albumsData: AlbumPlace): Promise<AlbumPlace> {
    console.log('updateAlbum');
    return this.http.put(this.apiUrl + albumsData.id, albumsData)
      .toPromise()
      .then(response => response.json() as AlbumPlace)
      .catch(this.handleError);
  }
  */

  updateAlbumList(albumsDataData: AlbumPlaceBean): Promise<any> {
    console.log('updateAlbum');
    console.log('CALL: ' + this.apiUrl + 'list/update/');
    return this.http.post(this.apiUrl + 'list/update/', albumsDataData)
      .toPromise()
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
