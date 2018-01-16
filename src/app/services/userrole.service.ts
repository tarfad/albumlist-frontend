import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

import {UserRole} from "../model/UserRole";
import {EnvironmentSpecificService} from "../core/services/environment-specific.service";
@Injectable()
export class UserRoleService {

  private mainApiUrl: string;
  private specifiedApiUrl = 'userroles/';

  constructor(private http: Http,
              private envSpecificSvc: EnvironmentSpecificService) {
    this.mainApiUrl = envSpecificSvc.envSpecific.mainApiUrl;
  }

  getApiUrl(): string {
    return this.mainApiUrl + this.specifiedApiUrl;
  }

  getUserRoles():  Promise<UserRole[]> {
    return this.http.get(this.getApiUrl())
      .toPromise()
      .then(response => response.json() as UserRole[])
      .catch(this.handleError);
  }

  findById(id: number): Promise<UserRole> {
    return this.http.get(this.getApiUrl() + id)
      .toPromise()
      .then(response => response.json() as UserRole)
      .catch(this.handleError);
  }

  saveUserRole(userRoleData: UserRole): Promise<UserRole> {
    return this.http.post(this.getApiUrl(), userRoleData)
      .toPromise().then(response => response.json() as UserRole)
      .catch(this.handleError);
  }

  deleteUserRole(id: number): Promise<any> {
    return this.http.delete(this.getApiUrl() + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateUserRole(userRoleData: UserRole): Promise<UserRole> {
    return this.http.put(this.getApiUrl() + userRoleData.id, userRoleData)
      .toPromise()
      .then(response => response.json() as UserRole)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
