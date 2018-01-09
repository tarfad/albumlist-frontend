import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import {URLSearchParams} from "@angular/http/src/url_search_params";

@Injectable()
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users/';

  constructor(private http: Http) { }

  getUsers():  Promise<User[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  findById(id: number): Promise<User> {
    return this.http.get(this.apiUrl + id)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  saveUser(userData: User): Promise<User> {
    return this.http.post(this.apiUrl, userData, {params: {'password': userData.password}})
      .toPromise().then(response => response.json() as User)
      .catch(this.handleError);
  }

  deleteUser(id: number): Promise<any> {
    return this.http.delete(this.apiUrl + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateUser(userData: User): Promise<User> {
    console.log('updateUser');
    return this.http.put(this.apiUrl + userData.id, userData)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  updatePassword(id: number, oldPassword: string, newPassword: string): Promise<User> {
    console.log('updateUser');
    return this.http.put(this.apiUrl + 'changePassword', {params: {'id': id, 'oldPassword': oldPassword, 'newPassword': newPassword}})
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
