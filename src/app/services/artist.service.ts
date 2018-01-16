import {Injectable} from '@angular/core';
import {Artist} from '../model/Artist';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {EnvironmentSpecificService} from "../core/services/environment-specific.service";

@Injectable()
export class ArtistService {

  private mainApiUrl: string;
  private specifiedApiUrl = 'artists/';

  constructor(private http: Http,
              private envSpecificSvc: EnvironmentSpecificService) {
    this.mainApiUrl = envSpecificSvc.envSpecific.mainApiUrl;
  }

  getApiUrl(): string {
    return this.mainApiUrl + this.specifiedApiUrl;
  }

  getArtists():  Promise<Artist[]> {
    return this.http.get(this.getApiUrl())
      .toPromise()
      .then(response => response.json() as Artist[])
      .catch(this.handleError);
  }

  findById(id: number): Promise<Artist> {
    return this.http.get(this.getApiUrl() + id)
      .toPromise()
      .then(response => response.json() as Artist)
      .catch(this.handleError);
  }

  saveArtist(artistsData: Artist): Promise<Artist> {
    return this.http.post(this.getApiUrl(), artistsData)
      .toPromise().then(response => response.json() as Artist)
      .catch(this.handleError);
  }

  deleteArtist(id: number): Promise<any> {
    return this.http.delete(this.getApiUrl() + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateArtist(artistsData: Artist): Promise<Artist> {
    return this.http.put(this.getApiUrl() + artistsData.id, artistsData)
      .toPromise()
      .then(response => response.json() as Artist)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

  searchAtists(currentSearchString: string): Promise<Artist[]>  {
    let param = {params: {'searchString': currentSearchString}}
    console.log(param);
    return this.http.get(this.getApiUrl() + "search/",param )
      .toPromise()
      .then(response => response.json() as Artist[])
      .catch(this.handleError);
  }
}
