import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthApiUrl } from './models/shared/app-constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const user = {
    'userName' : 'admin',
    'password' : 'admin'
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'RSSMApp';

    constructor(private http : HttpClient) {

    this.http.post<any>(AuthApiUrl, user, httpOptions)
    .subscribe( (res : any) => {
      localStorage.setItem('access_token', res.token);
    });
  }

}
