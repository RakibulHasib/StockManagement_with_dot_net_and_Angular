import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../../models/Authentication/register';
import { LogUrl } from '../../models/shared/app-constants';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient
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

  getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
 

}
