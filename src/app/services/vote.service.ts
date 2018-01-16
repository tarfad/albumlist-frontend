import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AlbumPlace} from "../model/AlbumPlace";
import {VoteBean} from "../beans/AlbumPlaceBean";
import {EnvironmentSpecificService} from "../core/services/environment-specific.service";

@Injectable()
export class VoteService {

  private mainApiUrl: string;
  private specifiedApiUrl = 'vote/';

  constructor(private http: Http,
              private envSpecificSvc: EnvironmentSpecificService) {
    this.mainApiUrl = envSpecificSvc.envSpecific.mainApiUrl;
  }

  getApiUrl(): string {
    return this.mainApiUrl + this.specifiedApiUrl;
  }

  getAlbumsByYearAndUser(year: number, userId: number):  Promise<AlbumPlace[]> {
    return this.http.get(this.getApiUrl() + "year/", {params: {'year': year, 'id': userId}})
      .toPromise()
      .then(response => response.json() as AlbumPlace[])
      .catch(this.handleError);
  }

  updateAlbumList(albumsDataData: VoteBean): Promise<any> {
    return this.http.post(this.getApiUrl() + 'list/update/', albumsDataData)
      .toPromise()
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
