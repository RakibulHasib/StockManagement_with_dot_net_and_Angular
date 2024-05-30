import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Register } from "src/app/models/Authentication/register";
import { UserUrl } from "src/app/models/shared/app-constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }
  register(): Observable<Register[]> {
    return this.http.get<Register[]>(`${UserUrl}/Register`);
  }

  signup(user: any) {
    return this.http.post<any>(`${UserUrl}/register`, user);
  }
  update(data: any): Observable<any> {
    return this.http.put<any>(`${UserUrl}/update-user`, data);
  }
  getById(userId: number): Observable<any> {
    return this.http.get<any>(`${UserUrl}/get-by-userId?userId=${userId}`);
  }
  approval(userId: number,data:any): Observable<any> {
    return this.http.put<any>(`${UserUrl}/approval/${userId}`,data);
  }
  delete(userId: number,data:any): Observable<any> {
    return this.http.put<any>(`${UserUrl}/delete/${userId}`,data);
  }
  passwordReset(userId: number, oldPassword: string, newPassword: string, data:any): Observable<any> {
    return this.http.put<any>(`${UserUrl}/password-reset??userId=${userId}&oldPassword=${oldPassword}&newPassword=${newPassword}`,data);
  }
  roleInsert(role: any) {
    return this.http.post<any>(`${UserUrl}/role-insert`, role);
  }
  upapprovedUserList(): Observable<any> {
    return this.http.get<any>(`${UserUrl}/get-unapproved-user-list`);
  }
  userList(): Observable<any> {
    return this.http.get<any>(`${UserUrl}/get-user-list`);
  }
  roleAssign(data: any) {
    return this.http.post<any>(`${UserUrl}/assign-role`, data);
  }

  roleList(): Observable<any> {
    return this.http.get<any>(`${UserUrl}/role-list`);
  }

}

