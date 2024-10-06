import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let clonedRequest = req;
    if (token) {
      clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();  
          this.router.navigate(['signin']); 
        }
        return throwError(error); 
      })
    );
  }
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     const token = localStorage.getItem('token'); 
    //     if (token) {
    //         const clonedRequest = req.clone({
    //             headers: req.headers.set('Authorization', `Bearer ${token}`)
    //         });
    //         return next.handle(clonedRequest);
    //     }
    //     return next.handle(req);
    // }
}

