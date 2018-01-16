import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AlbumListPlace} from "../beans/AlbumListPlace";
import {EnvironmentSpecificService} from "../core/services/environment-specific.service";

@Injectable()
export class AlbumListService {

  private mainApiUrl: string;
  private specifiedApiUrl = 'albumlist/';

  constructor(private http: Http,
              private envSpecificSvc: EnvironmentSpecificService) {
    this.mainApiUrl = envSpecificSvc.envSpecific.mainApiUrl;
  }

  getApiUrl(): string {
    return this.mainApiUrl + this.specifiedApiUrl;
  }

  getAlbumList(year: number, userRole: number):  Promise<AlbumListPlace[]> {
    return this.http.get(this.getApiUrl() + year + '/' + userRole + '/')
      .toPromise()
      .then(response => response.json() as AlbumListPlace[])
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
