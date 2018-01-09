import {Artist} from "./Artist";

export class Album {
  id: number;
  name: string;
  spotifyLink: string;
  artist: Artist;

  constructor(id: number, name: string, spotifyLink: string, artist: Artist){
    this.id = id;
    this.name = name;
    this.spotifyLink = spotifyLink;
    this.artist = artist;
  }
}
