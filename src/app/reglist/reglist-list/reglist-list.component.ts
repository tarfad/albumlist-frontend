import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {UserService} from "../../services/user.service";
import {User} from "../../model/User";
import {AlbumService} from "../../services/album.service";
import {Album} from "../../model/Album";

@Component({
  selector: 'app-reglist-list',
  templateUrl: './reglist-list.component.html',
  styleUrls: ['./reglist-list.component.css'],
  providers: [UserService, AlbumService]
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
              private userService: UserService,
              private albumService: AlbumService
  ) { }

  ngOnInit() {

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

    this.years = [
      2001,
      2002,
      2003,
      2004,
      2005,
      2006
    ];

    this.albumForm.patchValue( {theYear: 2004});

    this.userService.getUsers()
      .then(users => this.users = users );

    this.albumService.getAlbumsByYear(2017).
    then(albums => this.albums = albums);

    let a = JSON.stringify(this.albums);
    console.log(a);


  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    for (let propName in changes) {
      let change = changes[propName];
      let curVal  = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);

      console.log(curVal);
      console.log(prevVal);
    }
  }

  doTriggerYear(newYear){
    console.log('doTriggerYear = ' + newYear);
    this.currentYear = newYear;
    if(this.currentUser == null || this.currentUser == -1) {
      console.log("No current user")
    }
    else {
      console.log('currentUser = ' + this.currentUser);
    }

/*
    this.albumService.getAlbumsByYear(this.currentYear).
    then(albums => this.albums = albums);
*/
  }

  doTriggerUser(newUser) {
    console.log('doTriggerUser = ' + newUser);
    this.currentUser = newUser;
    if (this.currentYear == null || this.currentYear == -1) {
      console.log("No current year")
    }
    else {
      console.log('currentYear = ' + this.currentYear);
    }
  }

  doTriggerAlbum(place, newAlbum){
    console.log('doTriggerAlbum = ' + newAlbum);
    console.log('place = ' + place);

  }

}
