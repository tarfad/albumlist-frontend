
export class AlbumPlaceBean {
  userId: number;
  year: number;
  place: number;
  albums: number[];


  constructor(){
    this.albums = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
    ];
  }
}
