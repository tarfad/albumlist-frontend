export class UserRole {
  id: number;
  name: string;

  constructor(id: number, name: string){
    console.log('constructor UserRole');
    this.id = id;
    this.name = name;
  }
}
