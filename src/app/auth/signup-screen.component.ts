import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './user.model';

@Component({
  selector: 'app-signup-screen',
  styleUrls: ['./sign-screen.component.css'],
  templateUrl: './signup-screen.component.html',
})
export class SignupScreenComponent implements OnInit {
  public hide = true;
  public passwordNotCheck = false;
  public signUpForm: FormGroup;

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
      this.hide = true;
      this.passwordNotCheck = false;
    }

    if (this.signUpForm.valid && this.signUpForm.value.password !== this.signUpForm.value.passwordchk) {
      this.passwordNotCheck = true;
    }
  }

}
