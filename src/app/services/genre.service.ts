import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

import {UserRole} from "../model/UserRole";
@Injectable()
export class GenreRoleService {

  private apiUrl = 'http://localhost:8080/api/genres/';

  constructor(private http: Http) { }

  getUserRoles():  Promise<UserRole[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json() as UserRole[])
      .catch(this.handleError);
  }

  findById(id: number): Promise<UserRole> {
    return this.http.get(this.apiUrl + id)
      .toPromise()
      .then(response => response.json() as UserRole)
      .catch(this.handleError);
  }

  saveUserRole(userRoleData: UserRole): Promise<UserRole> {
    return this.http.post(this.apiUrl, userRoleData)
      .toPromise().then(response => response.json() as UserRole)
      .catch(this.handleError);
  }

  deleteUserRole(id: number): Promise<any> {
    return this.http.delete(this.apiUrl + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateUserRole(userRoleData: UserRole): Promise<UserRole> {
    console.log('updateUserRole');
    return this.http.put(this.apiUrl + userRoleData.id, userRoleData)
      .toPromise()
      .then(response => response.json() as UserRole)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
