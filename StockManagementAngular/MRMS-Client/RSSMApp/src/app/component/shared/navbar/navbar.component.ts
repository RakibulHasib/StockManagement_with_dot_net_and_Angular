import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { combineAll, filter, map, Observable, shareReplay, Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/Authentication/authentication.service';
import { Company } from 'src/app/models/companyenum/company';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { UserRole } from 'src/app/models/Enum/UserStatus.enum';
import { UserInfo } from 'src/app/models/Authentication/userInfo';
import { UserRoleService } from 'src/app/services/Shared/user-role.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 routerSubscription: Subscription | null = null;;
  userInfo!: UserInfo;
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

  role = UserRole;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthenticationService,
    private router: Router,
    private userRoleService: UserRoleService
  ) { }

  

  ngOnInit(): void {

    this.routerSubscription = this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationStart)
      )
      .subscribe((event: NavigationStart) => {
        this.getUserRole();
        if (event.navigationTrigger === 'popstate') {
          if (event.url == "/signin" || event.url == "/") {
            this.drawer.close();
            this.authService.logout();
          }
          if (event.url == "/home") {
            if (!this.isAuthenticated()) {
              this.router.navigateByUrl('/signin');
            }
          }
        }

        if(event.navigationTrigger==='imperative'){
          if(!this.isAuthenticated()){
            this.drawer.close();
            // this.router.navigateByUrl('/signin');
          } 
        }
        
      })
      
  }


  isRegisterPage(): boolean {
    return this.router.url === '/signUp';
  }

  isLoginPage() {
    return this.router.url === '/' || this.router.url === '/signin';
  }


  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUserRole(): boolean {
    if (this.isAuthenticated()) {
      const userData = this.authService.getUserData();
      if (userData) {
        this.userInfo = userData;
        return true;
      }
    }
    return false;
  }

  


  logOut() {
    this.authService.logout();
    this.isAuthenticated();
    this.drawer.close();
    this.router.navigate(['signin']);
    
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe(); 
    }
  }

}
