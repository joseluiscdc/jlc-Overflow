import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { DeleteCtaComponent } from '../message/deleteCta.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService]
})
export class ProfileComponent implements OnInit {
  public hide = true;
  public passwordNotCheck = false;
  public profileForm: FormGroup;
  public userProfile;
  public durationInSeconds = 5;

  constructor(private authService: AuthService,
  			  private router: Router,
  			  private snackBar: MatSnackBar,
          public dialog: MatDialog) { }

  public ngOnInit() {
  	this.userProfile = JSON.parse(this.authService.getUser());
    this.profileForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      passwordchk: new FormControl(null, Validators.required),
    });
  }

  public confirmDelete() {
    if (this.profileForm.valid && this.profileForm.value.password !== this.profileForm.value.passwordchk) {
      this.passwordNotCheck = true;
    }
    if (this.profileForm.valid && this.profileForm.value.password === this.profileForm.value.passwordchk ) {
      this.dialog.open(DeleteCtaComponent);
      this.hide = true;
      this.passwordNotCheck = false;
    }
  }

  public onSubmit() {
    if (this.profileForm.valid && this.profileForm.value.password === this.profileForm.value.passwordchk ) {
      const { email, password} = this.profileForm.value;
      const user = new User(email, password, null, null, this.userProfile.userId);
      this.authService.updateUser(user)
		              .subscribe(
				         a => {
			         	    this.snackBar.openFromComponent(MessageComponent, {
						             duration: this.durationInSeconds * 555,
						        });
			            	this.router.navigateByUrl('/questions')
				         },
				         error => this.router.navigateByUrl('/')
				       );

      this.hide = true;
      this.passwordNotCheck = false;
    }

    if (this.profileForm.valid && this.profileForm.value.password !== this.profileForm.value.passwordchk) {
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