import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { combineAll, filter, map, Observable, shareReplay } from 'rxjs';
import { AuthenticationService } from '../../../services/Authentication/authentication.service';
import { Company } from 'src/app/models/companyenum/company';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { UserRole } from 'src/app/models/Enum/UserStatus.enum';
import { UserInfo } from 'src/app/models/Authentication/UserInfo';
import { UserRoleService } from 'src/app/services/Shared/user-role.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

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
  // @HostListener('window:popstate', ['$event'])
  // onPopState(event: PopStateEvent) {
  //   this.drawer.close();
  //   console.log("Url:", window.location.href);
  //   const isSignInPage = window.location.href.includes('signin');
  //   console.log(isSignInPage)

  //   if (isSignInPage) {
  //     this.drawer.close();
  //     this.authService.logout();
  //     this.router.navigate(['']);
  //     return; 
  //   }
  //   console.log(window.history.state?.navigationId )
  //   console.log(event.state.navigationId)
  //   const isForward =  event.state && event.state.navigationId > (window.history.state?.navigationId || 0);

  //   console.log("forward",isForward)
  // if (isForward && !this.isAuthenticated()) {
  //   this.router.navigate(['signin']); // Redirect to sign-in if not authenticated
  // }

  // }

  ngOnInit(): void {
    this.router.events
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

        // if(event.navigationTrigger==='imperative'){
        //   if(!this.isAuthenticated()){
        //     this.router.navigateByUrl('/signin');
        //   } 
        // }
        //  console.log("User_Details",this.authService.getCurrentUser()) ;

        // console.groupEnd();
        // this.userData = this.authService.getCurrentUser();
        // console.log("user_data",this.userData);
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

    if(this.isAuthenticated()){
      this.authService.getCurrentUser().subscribe(
        res => {
          this.userInfo = res; 
          this.userRoleService.setUserInfo(res);
        },
        error => {
          console.error('Error occurred while fetching user info:', error);
        }
      );
      return true;
    }
    else{
      return false;
    }
     
  }


  logOut() {
    this.authService.logout();
    this.isAuthenticated();
    this.router.navigate(['signin']);
    this.drawer.close()
  }

}
