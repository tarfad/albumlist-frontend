import {UserRole} from "./UserRole";

export class User {
  id: number;
  userName: string;
  password: string;
  fullName: string;
  userRole: UserRole;


  constructor(id: number, userName: string, password: string, fullName: string, userRole: UserRole){
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.fullName = fullName;
    this.userRole = userRole;
  }
}
