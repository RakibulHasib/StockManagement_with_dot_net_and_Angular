import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthenticationService } from '../../../services/Authentication/authentication.service';
import { NotificationService } from '../../../services/Shared/notification.service';
import { UserService } from 'src/app/services/User/User.service';
import Swal from 'sweetalert2';
import { Status } from 'src/app/models/Enum/status.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
   // Token: new FormControl(''),
    //role: new FormControl('')
  });
  constructor(
    private userService: UserService,
    private formbuilder: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef,
    private notifyService: NotificationService,

  ) { }


  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.userService.signup(this.signupForm.value).subscribe({
        next: (response => {
          if(response.status== Status.UserExist){
            // this.signupForm.controls['username'].markAsTouched();
            // this.signupForm.controls['username'].setErrors({ 'userExists': true }); 
            Swal.fire({
              icon: 'error',
              title: 'User Name Exist!',
              text: 'Please try different user name.',
              timer: 4000,
              showConfirmButton: false,
              width: 400,
              position: "top",
            });
            this.router.navigate(['signUp']);
          }
          else{
            Swal.fire({
              icon: 'success',
              title: 'Sign Up!',
              text: 'Thank you for register. Please wait for admin approval.',
              timer: 4000 ,
              showConfirmButton: false,
              width: 400,
              position: "top",
              customClass: {
                container: 'swal-top'
              }
            });
            this.signupForm.reset();
            this.router.navigate(['signin']);
          }
          
        }),
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Error ',
            timer: 2000,
            showConfirmButton: false,
            width: 400,
            position: "top",
          });
          throwError(() => err);
        }
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Server Error!',
        text: 'Failed to save data. Try again after sometimes',
        timer: 2000,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
    }

  }
}
