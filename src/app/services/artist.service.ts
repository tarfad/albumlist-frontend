import {Injectable} from '@angular/core';
import {Artist} from '../model/Artist';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ArtistService {

  private apiUrl = 'http://localhost:8080/api/artists/';

  constructor(private http: Http) { }

  getArtists():  Promise<Artist[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json() as Artist[])
      .catch(this.handleError);
  }

  findById(id: number): Promise<Artist> {
    return this.http.get(this.apiUrl + id)
      .toPromise()
      .then(response => response.json() as Artist)
      .catch(this.handleError);
  }

  saveArtist(artistsData: Artist): Promise<Artist> {
    return this.http.post(this.apiUrl, artistsData)
      .toPromise().then(response => response.json() as Artist)
      .catch(this.handleError);
  }

  deleteArtist(id: number): Promise<any> {
    return this.http.delete(this.apiUrl + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateArtist(artistsData: Artist): Promise<Artist> {
    console.log('updateArtist');
    return this.http.put(this.apiUrl + artistsData.id, artistsData)
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
    return this.http.get(this.apiUrl + "search/",param )
      .toPromise()
      .then(response => response.json() as Artist[])
      .catch(this.handleError);
  }
}
