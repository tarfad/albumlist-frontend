export class Artist {
  id: number;
  name: string;
  spotifyLink: string;

  constructor(id: number, name: string, spotifyLink: string){
    this.id = id;
    this.name = name;
    this.spotifyLink = spotifyLink;
  }
}
