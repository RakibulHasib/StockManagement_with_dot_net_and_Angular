import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { combineAll, map, Observable, shareReplay } from 'rxjs';
import { AuthenticationService } from '../../../services/Authentication/authentication.service';
import { Company } from 'src/app/models/companyenum/company';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  submenus: { [key: string]: boolean } = {};

  toggleSubmenu(submenuKey: string) {
    this.submenus[submenuKey] = !this.submenus[submenuKey];
  }

companies = {
  Savoy: Company[Company.Savoy],
  ZaNZee: Company[Company.ZaNZee],
  Lovello: Company[Company.Lovello],
  KaziFarmFood: Company[Company.KaziFarmFood],
  Igloo: Company[Company.Igloo]
}
  appTitle = "RSSM"
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );
  @ViewChild('drawer', { static: false }) drawer!: MatDrawer;
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthenticationService,
    private router: Router,
    

  ) { }



  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logOut() {
   this.authService.logout();
   this.isAuthenticated();
   this.router.navigate(['signin']);
   this.drawer.close()
  }


  
}
