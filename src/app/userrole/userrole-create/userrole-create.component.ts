import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {UserRole} from "../../model/UserRole";
import {UserRoleService} from "../../services/userrole.service";

@Component({
  selector: 'app-userrole-create',
  templateUrl: './userrole-create.component.html',
  styleUrls: ['./userrole-create.component.css'],
  providers: [UserRoleService]
})
export class UserroleCreateComponent implements OnInit {

  id: number;
  userRole: UserRole;

  userRoleForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userRoleService: UserRoleService) { }

  ngOnInit() {
    console.info('userRole-create-ngOnInit');

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userRoleForm = new FormGroup({
      roleName: new FormControl('', Validators.required)
    });

    if (this.id) { //edit form
      console.log('EDIT');
      this.userRoleService.findById(this.id).
      then(userRole => {
        this.id = userRole.id;
        this.userRoleForm.patchValue({
          roleName: userRole.name,
        });
      } );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    console.log('onSubmit');
    console.log(this.userRoleForm.controls['roleName'].value);
    if (this.userRoleForm.valid) {
      console.log('valid');
      if (this.id) {
        let userRole: UserRole = new UserRole(this.id,
          this.userRoleForm.controls['roleName'].value);
        let userRolePromise = this.userRoleService.updateUserRole(userRole);
      } else {
        let userRole: UserRole = new UserRole(null,
          this.userRoleForm.controls['roleName'].value);
        let userRolePromise2 = this.userRoleService.saveUserRole(userRole);

      }


    }
    this.userRoleForm.reset();
    this.router.navigate(['/userrole']);
  }

  redirectUserRolePage() {
    this.router.navigate(['/userrole']);

  }
}
