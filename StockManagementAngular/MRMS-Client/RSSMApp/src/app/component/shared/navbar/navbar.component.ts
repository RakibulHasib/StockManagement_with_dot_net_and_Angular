import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, ViewChild, ViewChildren } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { combineAll, filter, map, Observable, shareReplay } from 'rxjs';
import { AuthenticationService } from '../../../services/Authentication/authentication.service';
import { Company } from 'src/app/models/companyenum/company';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
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

        console.log("For address bar",event.navigationTrigger)
        // Handle browser back and forward button clicks
        if (event.navigationTrigger === 'popstate') {
          if(event.url=="/signin"|| event.url=="/"){
            this.drawer.close();
            this.authService.logout();
            console.log("auth",this.isAuthenticated())
          } 
          if(event.url=="/home"){
            console.log("auth",this.isAuthenticated())
            if(!this.isAuthenticated()){
              this.router.navigateByUrl('/signin');
            } 
          }
        }
        // if(event.navigationTrigger==='imperative'){
        //   if(!this.isAuthenticated()){
        //     this.router.navigateByUrl('/signin');
        //   } 
        // }
       
        console.groupEnd();
      })
  }


  isRegisterPage(): boolean {
    return this.router.url === '/signUp';
  }

  isLoginPage(){
    return this.router.url === '/signin';
  }


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
