import {UserGroup} from "./UserGroup";

export class User {
  id: number;
  userName: string;
  password: string;
  fullName: string;
  userGroup: UserGroup;


  constructor(id: number, userName: string, password: string, fullName: string, userGroup: UserGroup){
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.fullName = fullName;
    this.userGroup = userGroup;
  }
}
