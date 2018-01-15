import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserRoleService} from "../../services/userrole.service";
import {UserRole} from "../../model/UserRole";
@Component({
  selector: 'app-userrole-list',
  templateUrl: './userrole-list.component.html',
  styleUrls: ['./userrole-list.component.css'],
  providers: [UserRoleService]
})
export class UserRoleListComponent implements OnInit {

  private userRoles: UserRole[];

  constructor(private router: Router,
              private location: Location,
              private userRoleService: UserRoleService) { }

  ngOnInit() {
    console.log('ngOnInit - Userrole');
    this.getAllUserRoles();
  }

  getAllUserRoles(): void {
    console.log('getAllUserroles');
    this.userRoleService.getUserRoles()
      .then(userRoles => this.userRoles = userRoles );
  }

  redirectNewUserRolePage() {
    console.log('redirectNewUserRolePage');
    this.router.navigate(['/userrole/create']);
  }

  editUserRolePage(userRole: UserRole) {
    console.log('editUserRolePage');
    if (userRole) {
      this.router.navigate(['/userrole/edit', userRole.id]);
    }
  }

  deleteUserRole(userRole: UserRole) {
    console.log('Delete UserRole: ' + userRole.name);
    let promise = this.userRoleService.deleteUserRole(userRole.id);
    this.reloadPage();
    console.log('done');
  }

  reloadPage() {
    console.log('reloadPage');
    location.reload();
  }
}
