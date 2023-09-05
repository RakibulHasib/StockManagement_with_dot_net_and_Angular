import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthenticationService } from '../../../services/Authentication/authentication.service';
import { NotificationService } from '../../../services/Shared/notification.service';

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
    private auth: AuthenticationService,
    private formbuilder: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef,
    private notifyService: NotificationService,

  ) { }


  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.auth.signup(this.signupForm.value).subscribe({
        next: (response => {
          this.notifyService.message(`Successfully logged in as ${this.signupForm.value.email}`, 'DISMISS');
          this.signupForm.reset();
          this.router.navigate(['signin']);
        }),
        error: err => {
          this.notifyService.message('Failed to save data', 'DISMISS');
          throwError(() => err);
        }
      });
    }
    else {
      this.notifyService.message('Failed to save data', 'DISMISS');
    }

  }
}
