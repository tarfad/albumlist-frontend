import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {EnvironmentSpecificService} from "../core/services/environment-specific.service";

@Injectable()
export class UserService {

  private mainApiUrl: string;
  private specifiedApiUrl = 'users/';

  constructor(private http: Http,
              private envSpecificSvc: EnvironmentSpecificService) {
    this.mainApiUrl = envSpecificSvc.envSpecific.mainApiUrl;
  }

  getApiUrl(): string {
    return this.mainApiUrl + this.specifiedApiUrl;
  }

  getUsers():  Promise<User[]> {
    return this.http.get(this.getApiUrl())
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  findById(id: number): Promise<User> {
    return this.http.get(this.getApiUrl() + id)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  saveUser(userData: User): Promise<User> {
    return this.http.post(this.getApiUrl(), userData, {params: {'password': userData.password}})
      .toPromise().then(response => response.json() as User)
      .catch(this.handleError);
  }

  deleteUser(id: number): Promise<any> {
    return this.http.delete(this.getApiUrl() + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateUser(userData: User): Promise<User> {
    console.log('updateUser');
    return this.http.put(this.getApiUrl() + userData.id, userData)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  updatePassword(id: number, oldPassword: string, newPassword: string): Promise<User> {
    console.log('updateUser');
    return this.http.put(this.getApiUrl() + 'changePassword', {params: {'id': id, 'oldPassword': oldPassword, 'newPassword': newPassword}})
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
