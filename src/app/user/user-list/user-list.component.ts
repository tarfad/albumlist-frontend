import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

import { User } from "../../model/User";
import { UserService } from "../../services/user.service";


import { EnvSpecific } from '../../core/models/Env-specific';
import {EnvironmentSpecificService} from "../../core/services/environment-specific.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  users: User[];
  private envSpecific: EnvSpecific;

  constructor(private router: Router,
              private location: Location,
              private userService: UserService,
              private route: ActivatedRoute,
              private envSpecificSvc: EnvironmentSpecificService) {
  }

  ngOnInit() {
    console.log('ngOnInit - User');


    console.log('this.envSpecificSvc.envSpecific.yearStart: ' + this.envSpecificSvc.envSpecific.yearStart);
    console.log('this.envSpecificSvc.envSpecific.yearEnd: ' + this.envSpecificSvc.envSpecific.yearEnd);


    //console.log('mainApiUrl:' + this.envSpecific.mainApiUrl);

    /*
    this.route.data
      .subscribe((data: { envSpecific: EnvSpecific }) => {
        console.log('subscribe');

        console.info(data);

        console.log('data.envSpecific.mainApiUrl: ' + data.envSpecific.mainApiUrl);
        console.log('data.envSpecific.yearStart: ' + data.envSpecific.yearStart);
        console.log('data.envSpecific.yearEnd: ' + data.envSpecific.yearEnd);
      });
    */

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
