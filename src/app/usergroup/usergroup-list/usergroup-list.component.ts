import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserGroup} from "../../model/UserGroup";
import {UserGroupService} from "../../services/usergroup.service";
@Component({
  selector: 'app-usergroup-list',
  templateUrl: './usergroup-list.component.html',
  styleUrls: ['./usergroup-list.component.css'],
  providers: [UserGroupService]
})
export class UserGroupListComponent implements OnInit {

  userGroups: UserGroup[];

  constructor(private router: Router,
              private location: Location,
              private userGroupService: UserGroupService) { }

  ngOnInit() {
    this.getAllUserGroups();
  }

  getAllUserGroups(): void {
    this.userGroupService.getUserGroups()
      .then(userGroups => this.userGroups = userGroups );
  }

  redirectNewUserGroupPage() {
    this.router.navigate(['/usergroup/create']);
  }

  editUserGroupPage(userGroup: UserGroup) {
    if (userGroup) {
      this.router.navigate(['/usergroup/edit', userGroup.id]);
    }
  }

  deleteUserGroup(userGroup: UserGroup) {
    let promise = this.userGroupService.deleteUserGroup(userGroup.id);
    this.reloadPage();
    console.log('done');
  }

  reloadPage() {
    console.log('reloadPage');
    location.reload();
  }
}
