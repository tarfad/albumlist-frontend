import {Artist} from "./Artist";

export class Album {
  id: number;
  name: string;
  spotifyLink: string;
  artist: Artist;
  year: number;

  constructor(id: number, name: string, spotifyLink: string, artist: Artist, year: number){
    this.id = id;
    this.name = name;
    this.spotifyLink = spotifyLink;
    this.artist = artist;
    this.year = year;
  }
}
