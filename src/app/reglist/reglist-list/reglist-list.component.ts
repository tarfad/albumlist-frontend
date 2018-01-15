import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {User} from "../../model/User";
import {Album} from "../../model/Album";
import {UserService} from "../../services/user.service";
import {AlbumService} from "../../services/album.service";
import {AlbumPlaceService} from "../../services/albumplace.service";
import {ConfigService} from "../../config/config.service";
import {AlbumPlaceBean} from "../../beans/AlbumPlaceBean";

@Component({
  selector: 'app-reglist-list',
  templateUrl: './reglist-list.component.html',
  styleUrls: ['./reglist-list.component.css'],
  providers: [ConfigService, UserService, AlbumService, AlbumPlaceService]
})
export class ReglistListComponent implements OnInit, OnChanges {

  years: number[];
  users: User[];
  albums: Album[];

  currentYear: number;
  currentUser: number;

  albumForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private configService: ConfigService,
              private userService: UserService,
              private albumService: AlbumService,
              private albumPlaceService: AlbumPlaceService
  ) {
    console.log('ReglistListComponent - constructor')
  }

  ngOnInit() {

    this.years = this.configService.getYears();

    this.currentYear = -1;
    this.currentUser = -1;


    this.albumForm = new FormGroup({
      theYear: new FormControl('', Validators.required),
      theUser: new FormControl('', Validators.required),
      theAlbum1: new FormControl(''),
      theAlbum2: new FormControl(''),
      theAlbum3: new FormControl(''),
      theAlbum4: new FormControl(''),
      theAlbum5: new FormControl(''),
      theAlbum6: new FormControl(''),
      theAlbum7: new FormControl(''),
      theAlbum8: new FormControl(''),
      theAlbum9: new FormControl(''),
      theAlbum10: new FormControl(''),
      theAlbum11: new FormControl(''),
      theAlbum12: new FormControl(''),
      theAlbum13: new FormControl(''),
      theAlbum14: new FormControl(''),
      theAlbum15: new FormControl(''),
      theAlbum16: new FormControl(''),
      theAlbum17: new FormControl(''),
      theAlbum18: new FormControl(''),
      theAlbum19: new FormControl(''),
      theAlbum20: new FormControl('')
    });

    this.userService.getUsers()
      .then(users => this.users = users );
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  doTriggerYear(newYear){
    console.log('doTriggerYear: ' + newYear);

    if(newYear == null) {
      this.currentYear = -1;
      this.albums = [];
    }
    else {
      this.currentYear = newYear;
      this.albumService.getAlbumsByYear(this.currentYear).
        then(albums => {
          this.albums = albums;
      });

    }
    this.setPlaces();
  }

  doTriggerUser(newUser) {
    console.log('doTriggerUser: ' + newUser);
    if(newUser == null) {
      this.currentUser = -1;
    }
    else {
      this.currentUser = newUser;
    }
    this.setPlaces();
  }

  setPlaces() {
    console.log()
    if (this.currentYear == -1 || this.currentUser == -1) {
      for(let place=1; place<=20;place++) {
        this.albumForm.get('theAlbum' + place).enable();
        this.albumForm.get('theAlbum'+place).patchValue(-1);
        this.albumForm.get('theAlbum'+place).disable();
      }
    }
    else {
      for (let place = 1; place <= 20; place++) {
        this.albumForm.get('theAlbum' + place).enable();
        this.albumForm.get('theAlbum' + place).patchValue(-1);
      }

      this.albumPlaceService.getAlbumsByYearAndUser(this.currentYear, this.currentUser).then(places => {
          for (let place of places) {
            this.albumForm.get('theAlbum' + place.place).patchValue(place.album.id);
          }
        }
      );
    }
  }

  doTriggerAlbum(place, newAlbum){

  }

  onSubmit() {
    console.log('onSubmit');
    let regBean: AlbumPlaceBean = new AlbumPlaceBean();
    regBean.userId = this.currentUser;
    regBean.year = this.currentYear;

    for(let place=1; place<=20;place++) {
      regBean.albums[place -1] = this.albumForm.get('theAlbum'+place).value;
      console.log(place + ' -> ' + this.albumForm.get('theAlbum'+place).value);
    }

    console.log(JSON.stringify(regBean));

    this.albumPlaceService.updateAlbumList(regBean);

    this.albumForm.patchValue({
      theUser: -1
    });

    this.doTriggerUser(-1);
  }

}
