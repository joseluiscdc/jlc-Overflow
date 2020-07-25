import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup-screen',
  styleUrls: ['./sign-screen.component.css'],
  templateUrl: './signup-screen.component.html',
})
export class SignupScreenComponent implements OnInit {
  public hide = true;
  public passwordNotCheck = false;
  public signUpForm: FormGroup;

  constructor(private authService: AuthService) { }

  /* tslint:disable:typedef */
  public ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      passwordchk: new FormControl(null, Validators.required),
    });
  }

  /* tslint:disable:typedef */
  public onSubmit() {
    if (this.signUpForm.valid && this.signUpForm.value.password === this.signUpForm.value.passwordchk ) {
      const{firstName, lastName, email, password} = this.signUpForm.value;
      const user = new User(email, password, firstName, lastName);
      this.authService.signUp(user).subscribe(this.authService.login, catchError(this.handleError));
      this.hide = true;
      this.passwordNotCheck = false;
    }

    if (this.signUpForm.valid && this.signUpForm.value.password !== this.signUpForm.value.passwordchk) {
      this.passwordNotCheck = true;
    }
  }

  private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
          console.error('An error ocurred: ', error.error.message);
      } else {
          console.error(
              error.error
          );
      }

      return throwError(
          'Something bad happened; please try again later.'
      );
  }
}
