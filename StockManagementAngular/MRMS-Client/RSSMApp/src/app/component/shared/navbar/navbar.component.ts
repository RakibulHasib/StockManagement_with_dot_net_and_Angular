import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthenticationService } from '../../../services/Authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appTitle = "RSSM"
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthenticationService,
    private router: Router,

  ) { }


  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  //logOut() {
  //  this.authService.signOut().subscribe(
  //    response => {
  //      // Clear any user-specific data or perform additional tasks upon successful logout
  //      console.log('User logged out successfully.');
  //    },
  //    error => {
  //      // Handle any errors that occurred during the logout process
  //      console.error('An error occurred while logging out:', error);
  //    }
  //  );

  //logOut() {
  //  this.authService.signOut().subscribe(
  //    () => {
  //      // Logout successful
  //      // Perform any additional actions after logout (e.g., redirect)
  //    },
  //    (error) => {
  //      // Handle error if logout fails
  //    }
  //  );
  //}


  logOut() {
    this.authService.logout();
    this.router.navigate(['signin']);
  }
  
}
