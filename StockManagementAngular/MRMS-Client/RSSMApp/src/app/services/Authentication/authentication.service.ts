import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../../models/Authentication/register';
import { LogUrl } from '../../models/shared/app-constants';
import { jwtDecode } from 'jwt-decode';
import { UserInfo } from 'src/app/models/Authentication/UserInfo';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
  ) { }
  register(): Observable<Register[]> {
    return this.http.get<Register[]>(`${LogUrl}/Register`);
}

  getById(id: number): Observable<Register > {
    return this.http.get<Register>(`${LogUrl}/Agents/${id}`);
  }

  signIn(data: any): Observable<Register> {

    return this.http.post<Register>(`${LogUrl}/signIn`, data);
  }
 

  logout() {
    localStorage.removeItem('token');
  }
 
  login(data: any) {
    return this.http.post<any>(`${LogUrl}/signIn`, data);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLogedIn(): boolean {
    return !!localStorage.getItem('token')
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
  var data= this.http.get<UserInfo>(`${LogUrl}/DecodeToken/${token}`);
  return data
}

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
 

}
