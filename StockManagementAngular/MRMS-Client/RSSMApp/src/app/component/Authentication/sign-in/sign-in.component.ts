import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AppComponent } from '../../../app.component';
import { AuthenticationService } from '../../../services/Authentication/authentication.service';
import { NotificationService } from '../../../services/Shared/notification.service';
import Swal from 'sweetalert2';
import { Status } from 'src/app/models/Enum/status.enum';

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
      console.log("Data",this.loginForm.value);

      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          switch (res.status) {
            case Status.Authorized :
              Swal.fire({
                icon: 'success',
                title: 'Logged In!',
                text: `Successfully logged in as ${this.loginForm.value.username}`,
                timer: 3000,
                showConfirmButton: false,
                width: 400,
                customClass: {
                  container: 'swal-top'
                }
              });
              this.auth.storeToken(res.token);
              this.loginForm.reset();
              this.router.navigate(['home']);
              console.log("res", res);
              return;
            case Status.Unapproved:
              Swal.fire({
                icon: 'error',
                title: 'Unapproved!',
                text: 'Your approval is pending.',
                timer: 3000,
                showConfirmButton: false,
                width: 400,
                position: "top",
              });
              this.router.navigate(['']);
              return;
            case Status.Failed:
              Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                text: 'Internal server error. Try again later',
                timer: 3000,
                showConfirmButton: false,
                width: 400,
                position: "top",
              });
              this.router.navigate(['']);
              return;
            case Status.UserNameNotFound:
              Swal.fire({
                icon: 'error',
                title: 'Wrong User Name!',
                text: 'Please enter correct username.',
                timer: 3000,
                showConfirmButton: false,
                width: 400,
                position: "top",
              });
              this.router.navigate(['']);
              return;
            case Status.WrongPassword:
              Swal.fire({
                icon: 'error',
                title: 'Wrong Password!',
                text: 'Please enter correct password.',
                timer: 3000,
                showConfirmButton: false,
                width: 400,
                position: "top",
              });
              this.router.navigate(['']);
              return;
            default:
              Swal.fire({
                icon: 'error',
                title: 'Wrong User Name and Password!',
                text: 'Please enter valid user name and password ',
                timer: 3000,
                showConfirmButton: false,
                width: 400,
                position: "top",
              });
          }
          

        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Error ',
            timer: 3000,
            showConfirmButton: false,
            width: 400,
            position: "top",
          });
          throwError(() => err);

        }
      });

    }
    else {
      console.log('Form is not valid');
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: 'Internal Server Error.Try again later',
        timer: 3000,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
    }
  }
}
