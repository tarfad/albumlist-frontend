import {Album} from "../model/Album";
import {User} from "../model/User";

export class AlbumListPlace {
  album: Album;
  place: number;

  totalPoint: number;
  placePoint: number;
  avgPoint: number;

  users: User[];
}
