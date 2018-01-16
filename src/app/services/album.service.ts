import {Injectable} from '@angular/core';
import {Album} from '../model/Album';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {EnvironmentSpecificService} from "../core/services/environment-specific.service";

@Injectable()
export class AlbumService {

  private mainApiUrl: string;
  private specifiedApiUrl = 'albums/';

  constructor(private http: Http,
              private envSpecificSvc: EnvironmentSpecificService) {
    this.mainApiUrl = envSpecificSvc.envSpecific.mainApiUrl;
  }

  getApiUrl(): string {
    return this.mainApiUrl + this.specifiedApiUrl;
  }

  getAlbums():  Promise<Album[]> {
    return this.http.get(this.getApiUrl())
      .toPromise()
      .then(response => response.json() as Album[])
      .catch(this.handleError);
  }

  findById(id: number): Promise<Album> {
    return this.http.get(this.getApiUrl() + id)
      .toPromise()
      .then(response => response.json() as Album)
      .catch(this.handleError);
  }

  getAlbumsByYear(year: number):  Promise<Album[]> {
    return this.http.get(this.getApiUrl() + "year/" + year)
      .toPromise()
      .then(response => response.json() as Album[])
      .catch(this.handleError);
  }

  searchAlbums(year: number, genreId: number, currentSearchString: string):  Promise<Album[]> {
    if(year == null) {
      year = -1;
    }
    if(genreId == null) {
      genreId = -1;
    }

    let param = {params: {'year': year, 'genreId': genreId,'searchString': currentSearchString}};
    return this.http.get(this.getApiUrl() + "search/",param )
      .toPromise()
      .then(response => response.json() as Album[])
      .catch(this.handleError);
  }

  saveAlbum(albumsData: Album): Promise<Album> {
    return this.http.post(this.getApiUrl(), albumsData)
      .toPromise().then(response => response.json() as Album)
      .catch(this.handleError);
  }

  deleteAlbum(id: number): Promise<any> {
    return this.http.delete(this.getApiUrl() + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateAlbum(albumsData: Album): Promise<Album> {
    return this.http.put(this.getApiUrl() + albumsData.id, albumsData)
      .toPromise()
      .then(response => response.json() as Album)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
