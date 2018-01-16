import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../config/config.service";
import {UserGroupService} from "../../services/usergroup.service";
import {UserGroup} from "../../model/UserGroup";
import {AlbumListPlace} from "../../beans/AlbumListPlace";
import {AlbumListService} from "../../services/albumlist.service";


@Component({
  selector: 'app-yearlist-list',
  templateUrl: './yearlist-list.component.html',
  styleUrls: ['./yearlist-list.component.css'],
  providers: [ConfigService, UserGroupService, AlbumListService]
})
export class YearlistListComponent implements OnInit {

  years: number[];
  userGroups: UserGroup[];
  users: User[];
  albumListPlaces: AlbumListPlace[];

  currentYear: number;
  currentGroup: number;

  yearlistForm: FormGroup;

  theYearX: any;
  theUserGroupX: any;

  constructor(private router: Router,
              private location: Location,
              private configService: ConfigService,
              private userGroupService: UserGroupService,
              private albumListService: AlbumListService) {}


  ngOnInit() {
    console.log('ngOnInit - User');

    this.currentYear = -1;
    this.currentGroup = -1;

    this.years = this.configService.getYears();
    this.getAllUserGroups();

    this.yearlistForm = new FormGroup({
      theYear: new FormControl('', Validators.required),
      theUserGroup: new FormControl('', Validators.required)
    });
  }

  getAllAlbumListPlace(): void {
    console.log('getAllAlbumListPlace');
    if(this.currentYear == null || this.currentYear == -1) {
      return;
    }

    if(this.currentGroup == null) {
      this.currentGroup = -1;
    }

    this.albumListService.getAlbumList(this.currentYear, this.currentGroup)
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

  getAllUserGroups(): void {
    this.userGroupService.getUserGroups()
      .then(userGroups => this.userGroups = userGroups );
  }

  doTriggerYear(newYear) {
    this.currentYear = newYear;

    console.log('currentGroup: ' + this.currentGroup);
    console.log('currentYear: ' + this.currentYear);

    this.getAllAlbumListPlace();
  }

  doTriggerUserGroup(newUserGroup) {
    this.currentGroup = newUserGroup;

    console.log('currentGroup: ' + this.currentGroup);
    console.log('currentYear: ' + this.currentYear);


    if(this.currentYear != -1) {
      this.getAllAlbumListPlace();
    }
  }

  reloadPage() {
    console.log('reloadPage');
    location.reload();
  }

  onSubmit() {

  }


}
