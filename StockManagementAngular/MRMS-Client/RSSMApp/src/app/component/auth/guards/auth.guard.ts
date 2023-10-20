import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../services/Authentication/authentication.service';
import { NotificationService } from '../../../services/Shared/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  //canActivate(
  //  route: ActivatedRouteSnapshot,
  //  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //  return true;
  //}
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private notifyService: NotificationService,

  ) { }

  canActivate(): boolean {
    if (this.auth.isLogedIn()) {
      return true;
    }
    else {
      this.notifyService.message('Need to Login', 'DISMISS')
      this.router.navigate(['login'])
      return false;
    }

  }
}
