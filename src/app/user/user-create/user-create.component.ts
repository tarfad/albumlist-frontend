import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from '@angular/router';
import {UserGroup} from "../../model/UserGroup";
import {UserGroupService} from "../../services/usergroup.service";


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService, UserGroupService]
})
export class UserCreateComponent implements OnInit, OnDestroy {

  id: number;
  user: User;

  userGroupId: number;
  userGroups: UserGroup[];

  userForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private userGroupService: UserGroupService
  ) { }

  ngOnInit() {
    console.info('user-create-ngOnInit');

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      theUserGroup: new FormControl('', Validators.required)
    });

    this.userGroupService.getUserGroups()
      .then(userGroups => this.userGroups = userGroups );

    if (this.id) { //edit form
      console.log('EDIT');
      this.userService.findById(this.id).
      then(user => {
        this.id = user.id;
        let userGroupId = null;
        if(user.userGroup != null) {
          userGroupId = user.userGroup.id;
        }
        this.userForm.patchValue({
          userName: user.userName,
          fullName: user.fullName,
          password: 'SET_PASSWORD',
          theUserGroup: userGroupId
        });
      } );

      this.userForm.controls['userName'].disable();
      this.userForm.controls['password'].disable();

    }
  }

  ngAfterContentInit(): void {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.userForm.valid) {
      let userGroup =
        new UserGroup(this.userForm.controls['theUserGroup'].value, '');

      if (this.id) {
        let user: User = new User(this.id,
          this.userForm.controls['userName'].value,
          this.userForm.controls['password'].value,
          this.userForm.controls['fullName'].value,
          userGroup);
        console.log(JSON.stringify(user));
        let userPromise = this.userService.updateUser(user);
      } else {
        let user: User = new User(null,
          this.userForm.controls['userName'].value,
          this.userForm.controls['password'].value,
          this.userForm.controls['fullName'].value,
          userGroup);
        let userPromise2 = this.userService.saveUser(user);

      }


    }
    this.userForm.reset();
    this.router.navigate(['/user']);
  }

  redirectUserPage() {
    this.router.navigate(['/user']);

  }

}
