import UserModel from "../models/user-model";

export class RemoteUserService {
  static remotes = [];

  constructor() {
          throw new Error("Use Singletom pattarn!");
  }

  static addRemoteUser(user) {
    RemoteUserService.remotes.push(user);
    return RemoteUserService.remotes;
  }

  static deleteRemoteUser(index) {
    RemoteUserService.remotes.splice(index, 1);
    return RemoteUserService.remotes;
  }

  static getRemoteUser() {
    return RemoteUserService.remotes;
  }
}
