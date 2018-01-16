export class Genre {
  id: number;
  name: string;
  parent: Genre

  constructor(id: number, name: string, parent: Genre){
    console.log('constructor Genre');
    this.id = id;
    this.name = name;
    this.parent = parent;
  }
}
