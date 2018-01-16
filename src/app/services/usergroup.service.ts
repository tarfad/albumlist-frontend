import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

import {UserGroup} from "../model/UserGroup";
import {EnvironmentSpecificService} from "../core/services/environment-specific.service";
@Injectable()
export class UserGroupService {

  private mainApiUrl: string;
  private specifiedApiUrl = 'usergroups/';

  constructor(private http: Http,
              private envSpecificSvc: EnvironmentSpecificService) {
    this.mainApiUrl = envSpecificSvc.envSpecific.mainApiUrl;
  }

  getApiUrl(): string {
    return this.mainApiUrl + this.specifiedApiUrl;
  }

  getUserGroups():  Promise<UserGroup[]> {
    console.log(this.getApiUrl());
    return this.http.get(this.getApiUrl())
      .toPromise()
      .then(response => response.json() as UserGroup[])
      .catch(this.handleError);
  }

  findById(id: number): Promise<UserGroup> {
    return this.http.get(this.getApiUrl() + id)
      .toPromise()
      .then(response => response.json() as UserGroup)
      .catch(this.handleError);
  }

  saveUserGroup(userGroupData: UserGroup): Promise<UserGroup> {
    return this.http.post(this.getApiUrl(), userGroupData)
      .toPromise().then(response => response.json() as UserGroup)
      .catch(this.handleError);
  }

  deleteUserGroup(id: number): Promise<any> {
    return this.http.delete(this.getApiUrl() + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateUserGroup(userGroupData: UserGroup): Promise<UserGroup> {
    return this.http.put(this.getApiUrl() + userGroupData.id, userGroupData)
      .toPromise()
      .then(response => response.json() as UserGroup)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
