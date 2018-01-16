import {Artist} from "./Artist";
import {Genre} from "./Genre";

export class Album {
  id: number;
  name: string;
  spotifyLink: string;
  artist: Artist;
  year: number;
  genre: Genre;

  constructor(id: number, name: string, spotifyLink: string, artist: Artist, year: number, genre: Genre){
    this.id = id;
    this.name = name;
    this.spotifyLink = spotifyLink;
    this.artist = artist;
    this.year = year;
    this.genre = genre;
  }
}
