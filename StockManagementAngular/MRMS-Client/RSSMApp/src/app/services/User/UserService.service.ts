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

 
 

}

