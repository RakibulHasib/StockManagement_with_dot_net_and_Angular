import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AppComponent } from '../../../app.component';
import { AuthenticationService } from '../../../services/Authentication/authentication.service';
import { NotificationService } from '../../../services/Shared/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup = new FormGroup({

    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private appComponent: AppComponent,
    private cd: ChangeDetectorRef,
    private notifyService: NotificationService,
  ) { localStorage.clear(); }



  onLogIn() {

    this.cd.detectChanges();

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.notifyService.message(`Successfully logged in as ${this.loginForm.value.username}`, 'DISMISS');
          this.auth.storeToken(res.token);
          this.loginForm.reset();
          this.router.navigate(['home']);

        },
        error: (err) => {
          this.notifyService.message('Loging Failed', 'DISMISS');
          throwError(() => err);

        }
      });

    }
    else {
      console.log('Form is not valid');
      this.notifyService.message('Failed to Login', 'DISMISS');
    }
  }
}
