export class UserGroup {
  id: number;
  name: string;

  constructor(id: number, name: string){
    console.log('constructor UserGroup');
    this.id = id;
    this.name = name;
  }
}
