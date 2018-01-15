import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AlbumListPlace} from "../beans/AlbumListPlace";

@Injectable()
export class AlbumListService {

  private apiUrl = 'http://localhost:8080//api/albumlist/';

  constructor(private http: Http) { }

  getAlbumList(year: number, userRole: number):  Promise<AlbumListPlace[]> {
    return this.http.get(this.apiUrl + year + '/' + userRole + '/')
      .toPromise()
      .then(response => response.json() as AlbumListPlace[])
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
