import UserModel from "../models/user-model";

export class LocalUserService {
  constructor() { 
      throw new Error("Use Singletom pattarn!");
  }

  static getLocalUser() {
    if (!LocalUserService.localUser) {
      LocalUserService.localUser = new UserModel();
    }
    return LocalUserService.localUser;
  } 
}

 


 