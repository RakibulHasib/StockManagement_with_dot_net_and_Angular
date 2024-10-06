import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../../models/Authentication/register';
import { LogUrl } from '../../models/shared/app-constants';
import { UserInfo } from 'src/app/models/Authentication/userInfo';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private readonly USER_TOKEN = 'token';
  private readonly USER_ID_KEY = 'userId';
  private readonly ROLE_ID_KEY = 'roleId';
  constructor(
    private http: HttpClient,
  ) { }
  register(): Observable<Register[]> {
    return this.http.get<Register[]>(`${LogUrl}/Register`);
  }

  getById(id: number): Observable<Register> {
    return this.http.get<Register>(`${LogUrl}/Agents/${id}`);
  }

  signIn(data: any): Observable<Register> {

    return this.http.post<Register>(`${LogUrl}/signIn`, data);
  }


  logout() {
    localStorage.removeItem(this.USER_TOKEN);
    localStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.ROLE_ID_KEY);
  }

  login(data: any) {
    return this.http.post<any>(`${LogUrl}/signIn`, data);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem(this.USER_TOKEN, tokenValue)
  }

  storeUserData(userId: string, roleId: string) {
    localStorage.setItem(this.USER_ID_KEY, userId)
    localStorage.setItem(this.ROLE_ID_KEY, roleId)
  }

  getUserData() {
    const userId = localStorage.getItem(this.USER_ID_KEY);
    const roleId = localStorage.getItem(this.ROLE_ID_KEY);
    if (userId && roleId) {
      return {
        userId: Number(userId),   
        roleId: Number(roleId)
      };
    }
    return null;
  }

  getToken() {
    return localStorage.getItem(this.USER_TOKEN)
  }

  isLogedIn(): boolean {
    return !!localStorage.getItem(this.USER_TOKEN)
  }


  //   getCurrentUser() {
  //     const token = this.getToken();
  //     if (!token) {
  //         return null;
  //     }

  //     try {
  //         const payload = jwtDecode(token);
  //         return payload;
  //     } catch (e) {
  //         console.error('Failed to decode token:', e);
  //         return null;
  //     }
  // }


  // tokenDecode(): Observable<UserClaim> {
  //   const url = `${endpoint.mainV1}/${endpoint.Decode}`;
  //   return this._baseApi
  //     .get<any>(url)
  //     .pipe(map((x) => new PayloadAdapter().adapt(x)));
  // }


  getCurrentUser(): Observable<UserInfo> {
    const token = this.getToken();
    var data = this.http.get<UserInfo>(`${LogUrl}/DecodeToken/${token}`);
    return data
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }


}
