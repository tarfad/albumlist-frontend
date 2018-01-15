export class Genre {
  id: number;
  name: string;
  parentId: number

  constructor(id: number, name: string, parentId: number){
    console.log('constructor Genre');
    this.id = id;
    this.name = name;
    this.parentId = parentId;
  }
}
