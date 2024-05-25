import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from 'src/app/models/Authentication/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private userInfoSubject: BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null);

  constructor() {}

  setUserInfo(userInfo: UserInfo) {
    this.userInfoSubject.next(userInfo);
  }

  getUserInfo(): UserInfo | null {
    return this.userInfoSubject.value;
  }

  // getUserRole(): UserRole | null {
  //   const userInfo = this.getUserInfo();
  //   return userInfo ? userInfo.role : null;
  // }

}
