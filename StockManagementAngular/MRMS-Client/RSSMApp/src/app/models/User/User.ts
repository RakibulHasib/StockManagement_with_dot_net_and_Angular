import { UserStatus } from "../Enum/UserStatus.enum";

export class User {
    constructor(
      public userId?: number,
      public firstName?: string,
      public lastName?: string,
      public userName?: string,
      public password?: string,
      public token?: string,
      public roleId?: number,
      public isDeleted?: number,
      public userStatus?: UserStatus
    ) { }
  }

