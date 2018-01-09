import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from "../../model/User";
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  private users: User[];

  constructor(private router: Router,
              private location: Location,
              private userService: UserService) { }

  ngOnInit() {
    console.log('ngOnInit - User');
    this.getAllUsers();
  }

  getAllUsers(): void {
    console.log('getAllUsers');
    this.userService.getUsers()
      .then(users => this.users = users );
  }

  redirectNewUserPage() {
    console.log('redirectNewUserPage');
    this.router.navigate(['/user/create']);
  }

  editUserPage(user: User) {
    console.log('editUserPage');
    if (user) {
      this.router.navigate(['/user/edit', user.id]);
    }
  }

  deleteArtist(user: User) {
    console.log('Delete User: ' + user.userName + ', ' + user.fullName);
    let promise = this.userService.deleteUser(user.id);
    this.reloadPage();
    console.log('done');
  }

  reloadPage() {
    console.log('reloadPage');
    location.reload();
  }

}
