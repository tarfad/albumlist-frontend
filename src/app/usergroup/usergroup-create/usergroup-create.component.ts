import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {UserGroup} from "../../model/UserGroup";
import {UserGroupService} from "../../services/usergroup.service";

@Component({
  selector: 'app-usergroup-create',
  templateUrl: './usergroup-create.component.html',
  styleUrls: ['./usergroup-create.component.css'],
  providers: [UserGroupService]
})
export class UserGroupCreateComponent implements OnInit {

  id: number;
  userGroup: UserGroup;

  userGroupForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userGroupService: UserGroupService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userGroupForm = new FormGroup({
      groupName: new FormControl('', Validators.required)
    });

    if (this.id) { //edit form
      this.userGroupService.findById(this.id).
      then(userGroup => {
        this.id = userGroup.id;
        this.userGroupForm.patchValue({
          groupName: userGroup.name,
        });
      } );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    console.log(this.userGroupForm.controls['groupName'].value);
    if (this.userGroupForm.valid) {
      console.log('valid');
      if (this.id) {
        let userGroup: UserGroup = new UserGroup(this.id,
          this.userGroupForm.controls['groupName'].value);
        let userGroupPromise = this.userGroupService.updateUserGroup(userGroup);
      } else {
        let userGroup: UserGroup = new UserGroup(null,
          this.userGroupForm.controls['groupName'].value);
        let userGroupPromise2 = this.userGroupService.saveUserGroup(userGroup);

      }


    }
    this.userGroupForm.reset();
    this.router.navigate(['/usergroup']);
  }

  redirectUserGroupPage() {
    this.router.navigate(['/usergroup']);

  }
}
