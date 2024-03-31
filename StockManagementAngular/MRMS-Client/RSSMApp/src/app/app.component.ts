import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthApiUrl } from './models/shared/app-constants';
import { AuthenticationService } from './services/Authentication/authentication.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// const user = {
//     'userName' : 'Rakim',
//     'password' : '2143'
//   }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'RSSMApp';

    constructor(
      private http : HttpClient,
      private auth: AuthenticationService
      ) {

    // this.http.post<any>(AuthApiUrl, user, httpOptions)
    // .subscribe( (res : any) => {
    //   localStorage.setItem('access_token', res.token);
    // });

    // this.auth.login(user).subscribe({
    //   next: (res) => {
    //     this.auth.storeToken(res.token);
    //   }
    //   });
  }

}
