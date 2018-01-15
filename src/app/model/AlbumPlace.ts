import {Album} from "./Album";
import {User} from "./User";

export class AlbumPlace {
  id: number;
  year: number;
  place: number;
  album: Album;
  user: User;


  constructor(id: number, year: number, place: number, album: Album, user: User){
    this.id = id;
    this.year = year;
    this.place = place;
    this.album = album;
    this.user = user;
  }
}
