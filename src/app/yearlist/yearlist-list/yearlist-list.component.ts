import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../config/config.service";
import {UserRoleService} from "../../services/userrole.service";
import {UserRole} from "../../model/UserRole";
import {AlbumListPlace} from "../../beans/AlbumListPlace";
import {AlbumListService} from "../../services/albumlist.service";


@Component({
  selector: 'app-yearlist-list',
  templateUrl: './yearlist-list.component.html',
  styleUrls: ['./yearlist-list.component.css'],
  providers: [ConfigService, UserRoleService, AlbumListService]
})
export class YearlistListComponent implements OnInit {

  private years: number[];
  private userRoles: UserRole[];
  private users: User[];
  private  albumListPlaces: AlbumListPlace[];

  currentYear: number;
  currentRole: number;

  yearlistForm: FormGroup;

  constructor(private router: Router,
              private location: Location,
              private configService: ConfigService,
              private userRoleService: UserRoleService,
              private albumListService: AlbumListService) {}


  ngOnInit() {
    console.log('ngOnInit - User');

    this.currentYear = -1;
    this.currentRole = -1;

    this.years = this.configService.getYears();
    this.getAllUserRoles();

    this.yearlistForm = new FormGroup({
      theYear: new FormControl('', Validators.required),
      theUserRole: new FormControl('', Validators.required)
    });
  }

  getAllAlbumListPlace(): void {
    console.log('getAllAlbumListPlace');
    if(this.currentYear == null || this.currentYear == -1) {
      return;
    }

    if(this.currentRole == null) {
      this.currentRole = -1;
    }

    this.albumListService.getAlbumList(this.currentYear, this.currentRole)
      .then(albumListPlaces => {
        this.albumListPlaces = albumListPlaces;
        let alp: AlbumListPlace;
        for (alp of albumListPlaces) {
          console.log(alp.album.name);
          if(alp.album.genre == null) {
            console.info('No genre');
          }
          else {
            console.info('Genre: ' + alp.album.genre.name);
          }
        }

      } );
  }

  getAllUserRoles(): void {
    console.log('getAllUserRoles');
    this.userRoleService.getUserRoles()
      .then(userRoles => this.userRoles = userRoles );
  }

  doTriggerYear(newYear) {
    console.log('doTriggerYear: ' + newYear);
    this.currentYear = newYear;

    console.log('currentRole: ' + this.currentRole);
    console.log('currentYear: ' + this.currentYear);

    this.getAllAlbumListPlace();
  }

  doTriggerUserRole(newUserRole) {
    console.log('doTriggerUserRole: ' + newUserRole);
    this.currentRole = newUserRole;

    console.log('currentRole: ' + this.currentRole);
    console.log('currentYear: ' + this.currentYear);


    if(this.currentYear != -1) {
      this.getAllAlbumListPlace();
    }
  }

  reloadPage() {
    console.log('reloadPage');
    location.reload();
  }


}
