export class User {
  id: number;
  userName: string;
  password: string;
  fullName: string;

  constructor(id: number, userName: string, password: string, fullName: string){
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.fullName = fullName;
  }
}
